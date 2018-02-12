import { SIZE, PLAYER, PIECE } from '../common/define';
import Board from '../common/Board';
import Piece from '../common/Piece';
import Point from '../common/Point';
import Move from '../common/Move';

export enum ENTRYTYPE {
    Exact,
    LowerBound,
    UpperBound
};

export class Item {
    public checkSum: [number, number]; // 64bit
    public entryType: ENTRYTYPE;
    public score: number;
    public depth: number;
    constructor(checkSum: [number, number], entryType: ENTRYTYPE, score: number, depth: number) {
        this.checkSum = [checkSum[0], checkSum[1]]; // by value, instead of by reference
        this.entryType = entryType;
        this.score = score;
        this.depth = depth;
    }
};

// Zobrist hashing
export class TranspositionTable {
    private size: number = 0; // size in bit
    private hashKey32: number = 0;
    private hashKey32Table: Array<Array<Array<number>>> = [];
    private hashKey64: [number, number] = [0, 0];
    private hashKey64Table: Array<Array<Array<[number, number]>>> = [];
    private transposition: [Array<Item | null>, Array<Item | null>] = [[],[]];// for self, and oppenent
    private rand32(): number{
        return Math.floor(Math.random() * ~(1 << 31));
    }
    private rand64(): [number, number] {
        return [this.rand32(), this.rand32()];
    }
    constructor(size: number) {
        this.size = size;
        this.initializeHashKey();
    }
    // base value for (piece, file, rank)
    private initializeHashKey(): void {
        this.hashKey32Table = new Array(14);
        this.hashKey64Table = new Array(14);
        for (let i = 0; i < 14; ++i) { // number of piece type x number of player
            this.hashKey32Table[i] = new Array(SIZE.files);
            this.hashKey64Table[i] = new Array(SIZE.files);
            for (let j = 0; j < SIZE.files; ++j) {
                this.hashKey32Table[i][j] = new Array(SIZE.ranks);
                this.hashKey64Table[i][j] = new Array(SIZE.ranks);
                for (let k = 0; k < SIZE.ranks; ++k) {
                    this.hashKey32Table[i][j][k] = this.rand32();
                    this.hashKey64Table[i][j][k] = this.rand64();
                }
            }
        }
        this.transposition = [new Array(1 << this.size), new Array(1 << this.size)];
        for (let i = 0; i < (1 << this.size); ++i) {
            this.transposition[0][i] = null;
            this.transposition[1][i] = null;
        }
    }
    private getPieceIndex(piece: Piece):number {
        let idx: number;
        switch (piece.type) {
            case PIECE.King: idx = 0; break;
            case PIECE.Guard: idx = 1; break;
            case PIECE.Bishop: idx = 2; break;
            case PIECE.Knight: idx = 3; break;
            case PIECE.Rook: idx = 4; break;
            case PIECE.Cannon: idx = 5; break;
            case PIECE.Pawn: idx = 6; break;
            default: throw Error("Unknown Piece Type");
        }
        return piece.owner == PLAYER.Red ? idx * 2 : idx * 2 + 1;
    }
    hash(board: Board):void {
        this.hashKey32 = 0;
        this.hashKey64 = [0, 0];
        let pos = new Point(0, 0);
        for (let j = 0; j < SIZE.files; ++j) {
            for (let k = 0; k < SIZE.ranks; ++k) {
                pos.moveTo(j, k);
                let piece = board.at(pos);
                if (piece == null) continue;
                let idx = this.getPieceIndex(piece);
                this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][j][k];
                this.hashKey64 = [
                    this.hashKey64[0] ^ this.hashKey64Table[idx][j][k][0],
                    this.hashKey64[1] ^ this.hashKey64Table[idx][j][k][1]
                ];
            }
        }
    }
    //  incremental hash
    hashMove(move: Move, piece: Piece, target: Piece | null): void {
        let idx = this.getPieceIndex(piece);
        this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.from.x][move.from.y];
        this.hashKey64 = [
            this.hashKey64[0] ^ this.hashKey64Table[idx][move.from.x][move.from.y][0],
            this.hashKey64[1] ^ this.hashKey64Table[idx][move.from.x][move.from.y][1]
        ];
        if (target != null) {
            idx = this.getPieceIndex(target);
            this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.to.x][move.to.y];
            this.hashKey64 = [
                this.hashKey64[0] ^ this.hashKey64Table[idx][move.to.x][move.to.y][0],
                this.hashKey64[1] ^ this.hashKey64Table[idx][move.to.x][move.to.y][1]
            ];
        }
    }
    // Notice: Here we do not use move and board(by reference) to find target piece,
    // because such a method depends on the order of board.undoMove() and this.hashUndoMove().
    // Function hashUndoMove() can not know if board.undoMove already changed board information or not.
    hashUndoMove(move: Move, piece: Piece, target: Piece | null): void {
        let idx: number;
        if (target != null) {
            idx = this.getPieceIndex(target);
            this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.to.x][move.to.y];
            this.hashKey64 = [
                this.hashKey64[0] ^ this.hashKey64Table[idx][move.to.x][move.to.y][0],
                this.hashKey64[1] ^ this.hashKey64Table[idx][move.to.x][move.to.y][1]
            ];
        }
        idx = this.getPieceIndex(piece);
        this.hashKey32 = this.hashKey32 ^ this.hashKey32Table[idx][move.from.x][move.from.y];
        this.hashKey64 = [
            this.hashKey64[0] ^ this.hashKey64Table[idx][move.from.x][move.from.y][0],
            this.hashKey64[1] ^ this.hashKey64Table[idx][move.from.x][move.from.y][1]
        ];
    }
    lookup(alpha: number, beta: number, depth: number, isOwn: boolean): Item | null {
        let mask = (1 << this.size) - 1;
        let key = this.hashKey32 & mask;
        let pht = this.transposition[isOwn ? 0 : 1][key];

        if (pht == null) return null; // not found
        if (pht.depth >= depth && (pht.checkSum[0] == this.hashKey64[0] &&
                pht.checkSum[1] == this.hashKey64[1])) {
            switch (pht.entryType) {
                case ENTRYTYPE.Exact:
                    return pht;
                case ENTRYTYPE.LowerBound:
                    if (pht.score >= beta) return pht;
                    break;
                case ENTRYTYPE.UpperBound:
                    if (pht.score <= alpha) return pht;
                    break;
            }
        }
        return null; // not found
    }
    update(type: ENTRYTYPE, score: number, depth: number, isOwn: boolean): void {
        let mask = (1 << this.size) - 1;
        let key = this.hashKey32 & mask;
        this.transposition[isOwn ? 0 : 1][key] = new Item(this.hashKey64, type, score, depth);
    }
}
