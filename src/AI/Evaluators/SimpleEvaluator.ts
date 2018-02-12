import Evaluator from '../Evaluator';
import Point from '../../common/Point';
import Board from '../../common/Board';
import Rule from '../../common/Rule';
import { PLAYER, PIECE, SIZE, pos2idx } from '../../common/define';

// score:
// -20000, already lost
// ...,
// -19901, lost after n-1 steps
// -19900, lost after n steps
// -19899, almost lost
// ...
// 0,
// ...
// 19899, almost win
// 19900, win after n steps
// 19901, win after n-1 steps
// ...
// 20000, already win

export default class SimpleEvaluator extends Evaluator {
    private static baseValue = function (piece: PIECE): number {
        switch (piece) {
            case PIECE.Pawn: return 100;
            case PIECE.Guard: return 200;
            case PIECE.Bishop: return 200;
            case PIECE.Rook: return 900;
            case PIECE.Knight: return 400;
            case PIECE.Cannon: return 450;
            case PIECE.King: return 10000;
        }
    }
    // value of each reachable position
    private static flexibility = function (piece: PIECE): number {
        switch (piece) {
            case PIECE.Pawn: return 15;
            case PIECE.Guard: return 1;
            case PIECE.Bishop: return 1;
            case PIECE.Rook: return 6;
            case PIECE.Knight: return 12;
            case PIECE.Cannon: return 6;
            case PIECE.King: return 0;
        }
    }
    // extra value for pawn
    private static extraPawnValue = function (board: Board, owner: PLAYER, pos: Point): number {
        let value: Array<Array<number>> = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [70, 70, 70, 70, 70, 70, 70, 70, 70],
            [70, 90, 110, 110, 110, 110, 110, 90, 70],
            [90, 90, 110, 120, 120, 120, 110, 90, 90],
            [90, 90, 110, 120, 120, 120, 110, 90, 90],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        if (owner === board.upSidePlayer) return value[pos.x][pos.y];
        else return value[pos.x][SIZE.ranks - pos.y];
    }
    constructor() {
        super();
        this.threshold = 19900;
        this.maxSearchDepth = 100;
    };
    evaluate(board: Board): number {
        // fisrt round scanning : statistics (per piece)
        // 1. how many pieces guard this piece
        // 2. how many pieces threat this piece
        // 3. how many poosible moves of this piece
        let attack = Array.apply(null, Array(SIZE.files * SIZE.ranks)).map(() => 0);
        let guard = Array.apply(null, Array(SIZE.files * SIZE.ranks)).map(() => 0);
        let flexibility = Array.apply(null, Array(SIZE.files * SIZE.ranks)).map(() => 0);
        let possible = Rule.getPossibleMoves(board, false);
        for (let move of possible) {
            let from = pos2idx(move.from.x, move.from.y);
            let to = pos2idx(move.to.x, move.to.y);
            if (move.protege != null) {
                guard[to] += 1;
            } else if (move.target !== null) {
                let attacker = board.at(move.from);
                let attackee = board.at(move.to);
                if (attacker==null || attackee == null) throw Error("Piece Not Found!");
                attack[to] += 3 + Math.floor(0.01 * (SimpleEvaluator.baseValue(attackee.type) - SimpleEvaluator.baseValue(attacker.type)));
                // checkmate
                if (attackee.type === PIECE.King) {
                    // owner can do nothing
                    if (board.currentMover !== attackee.owner) {
                        return this.WIN;
                    }
                }
            }
        }
        // second round scanning : score
        // 1. base, flexibility, extra value related to position
        // 2. threat, guard
        let self: number = 0;
        let opponent: number = 0;
        for (let x = 0; x < SIZE.files; ++x) {
            for (let y = 0; y < SIZE.ranks; ++y) {
                let piece = board.at(new Point(x, y));
                if (piece == null) continue;
                let pos = pos2idx(x, y);
                let pieceValue = 0;
                // Part 1: value of piece itself
                pieceValue += SimpleEvaluator.baseValue(piece.type); // 1. base value
                pieceValue += SimpleEvaluator.flexibility(piece.type) * flexibility[pos]; // 2. flexibility
                if (piece.type === PIECE.Pawn) {
                    pieceValue += SimpleEvaluator.extraPawnValue(board, piece.owner, new Point(x, y)); // 3. extra value depends on position
                }
                // Part 2: adjust value according to relationships with other pieces
                let unit = Math.floor(SimpleEvaluator.baseValue(piece.type) / 16);
                if (attack[pos] > 0) { //  menace from others
                    if (board.currentMover === piece.owner) { // for own pieces
                        if (piece.type === PIECE.King) { // king is in check
                            pieceValue -= 20; // state of emergency, must remove the threat immediately
                        } else {
                            pieceValue -= 2 * unit; // the threat vaules 2 unit
                            if (guard[pos] > 0) pieceValue += unit; // guarded by others, decrease the threat
                        }
                    } else { // for opponent's pieces
                        if (piece.type === PIECE.King) { // checkmate
                            return this.WIN;
                        }
                        pieceValue -= 10 * unit; // attack, the threat vaules 10 unit
                        if (guard[pos] > 0) pieceValue += 9 * unit; // guarded by others, decrease the threat
                    }
                    // More threat with capture, less chance for survival,
                    // which is for exchange evaluation.
                    pieceValue -= attack[pos];
                } else {
                    // If a piece is only guarded by others without threat from others,
                    // the active defense should increase safety a little.
                    if (guard[pos] > 0) pieceValue += 5;
                }
                if (piece.isOwnedBy(board.currentMover)) {
                    self += pieceValue;
                } else {
                    opponent += pieceValue;
                }
            }
        }
        return self - opponent;
    }
}
