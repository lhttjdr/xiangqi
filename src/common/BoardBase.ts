import { PIECE, PLAYER, SIZE, opponent, pos2idx, character } from './define';
import Point from './Point';
import Piece from './Piece';
import Move from './Move';

// basic board with IO
export default abstract class BoardBase {
    protected boardMap: Array<Piece | null>;

    protected upSide: PLAYER;

    protected mover: PLAYER;

    protected history: Array<Move>;

    constructor() {
        this.boardMap = Array.apply(null, Array(SIZE.files * SIZE.ranks));

        this.upSide = PLAYER.Black;

        this.mover = PLAYER.Red;

        this.history = [];
    }
    at(pos: Point): Piece | null {
        // this.legalityChecker(pos);
        return this.boardMap[pos2idx(pos.x, pos.y)];
    }
    set(pos: Point, piece: Piece | null): void {
        // this.legalityChecker(pos);
        this.boardMap[pos2idx(pos.x, pos.y)] = piece;
    }
    empty(pos: Point): boolean {
        // this.legalityChecker(pos);
        return this.boardMap[pos2idx(pos.x, pos.y)] == null;
    }
    // For robustness, it's necessary, although the arguments is not from users.
    // But for perfomance, it may be omitted, and the legality depends on developers.
    private legalityChecker(pos: Point):void {
        if (pos.x < 0 || pos.x > SIZE.files || pos.y < 0 || pos.y > SIZE.ranks)
            throw RangeError("Out of board!");
        if (Math.round(pos.x) !== pos.x || Math.round(pos.y) !== pos.y)
            throw Error("Must be integer!");
    }
    get currentMover(): PLAYER {
        return this.mover;
    }
    switchMover(): void {
        this.mover = opponent(this.mover);
    }
    get upSidePlayer(): PLAYER {
        return this.upSide;
    }
    get blewSidePlayer(): PLAYER {
        return opponent(this.upSide);
    }
    get moveHistory(): Array<Move> {
        return this.history;
    }
    // exchange two players
    switchSide(): void {
        this.upSide = opponent(this.upSide);
    }
    // only swap the side of board
    rotate() {
        this.upSide = opponent(this.upSide);
        let halfBoard = SIZE.ranks * SIZE.files / 2;
        this.boardMap = this.boardMap.slice(halfBoard).concat(this.boardMap.slice(0, halfBoard));
    }
    abstract clone();
    toString() {
        let str = "┌" + Array(SIZE.files).join("──") +"┐\n";
        for (let y = 0; y < SIZE.ranks; ++y) {
            str += "│";
            for (let x = 0; x < SIZE.files; ++x) {
                let piece = this.boardMap[pos2idx(x, y)]; 
                if (piece == null) str += "\u3000"; // full width space
                else str += character(piece.type, piece.owner);
            }
            str += "│\n";
        }
        str += "└" + Array(SIZE.files).join("──") + "┘\n";
        str += this.currentMover === PLAYER.Red ? "红方行棋" : "黑方行棋";
        return str;
    }
};
