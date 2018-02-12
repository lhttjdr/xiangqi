import Point from './Point';
import Piece from './Piece';
import Move from './Move';
import BoardBase from './BoardBase';

import { PLAYER, PIECE, SIZE, STATUS } from './define';

// test a move on given board (BoardBase)
export default class Rule {
    // basic concepts
    // board size: [0,9]x[0,10]
    static isOutsideBoard(pos: Point): boolean {
        return pos.x < 0 || pos.x >= SIZE.files || pos.y < 0 || pos.y >= SIZE.ranks;
    }
    // castle: [3,5]x[0,2] and [3,5]x[7,10]
    static isInCastle(pos: Point, owner: PLAYER, board: BoardBase): boolean {
        if (pos.x < 3 || pos.x > 5) return false;
        if (owner === board.upSidePlayer) {
            return pos.y <= 2;
        } else {
            return pos.y >= 7;
        }
    }
    // two sides of the river: up [0,9]x[0,4], below [0,9]x[5,10]
    static isCrossRiver(pos: Point, owner: PLAYER, board: BoardBase): boolean {
        if (owner === board.upSidePlayer) { 
            return pos.y >= 5;
        } else { 
            return pos.y <= 4;
        }
    }
    // quick test before current player doing anything
    static quickTestStatus(board: BoardBase): STATUS {
        // two kings
        let own: (Point | null) = null;
        let opponent: (Point | null) = null;
        let pos: Point = new Point();
        // castle
        for (let x of [3, 4, 5]) {
            for (let y of [0, 1, 2, 7, 8, 9]) {
                pos.moveTo(x, y);
                let piece = board.at(pos);
                if (piece == null) continue;   
                if (piece.type === PIECE.King) {
                    if (piece.isOwnedBy(board.currentMover)) own = pos.clone();
                    else opponent = pos.clone();
                }
            }
        }
        if (own == null && opponent == null) {
            return STATUS.Impossbile;
        } else if (own == null) {
            return STATUS.Lost;
        } else if (opponent == null) {
            return STATUS.Win;
        }
        // if two kings face each other
        if (own.x === opponent.x) {
            // count intervening pieces
            let up = (board.currentMover == board.upSidePlayer ? own.y : opponent.y);
            let blew = (board.currentMover == board.blewSidePlayer ? own.y : opponent.y);
            let intervening = 0;
            pos.moveTo(own.x, up + 1);
            while (pos.y < blew) {
                if (!board.empty(pos)) {
                    ++intervening;
                    break; // at least have one intervening pieces 
                }
                pos.y += 1;
            }
            // with no intervening pieces, fly check
            // win or lost depends on whose move causes fly check
            if (intervening === 0) return STATUS.FlyCheck;
        }
         
        // no possible moves, resign
        // if (Rule.getPossibleMoves(board, true).length==0) return STATUS.Stalemate;
        // it can be checked in search process, so the possible moves only need generate once.

        if (board.moveHistory.length > 60) {
            if (board.moveHistory.slice(-60).every((m: Move) => m.target == null))
                return STATUS.Draw;
        }

        // TODO:: perpetual checking and chasing
        // TODO:: draw

        return STATUS.NotEnded;
    }

    // test legality of move on a given board
    static isLegalMove(move: Move, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        // basic rules
        if (Rule.isOutsideBoard(from) || Rule.isOutsideBoard(to)) return false;     
        let piece = board.at(from);
        if (piece == null) throw Error("Piece Not Found!");
        if (!piece.isOwnedBy(board.currentMover)) return false;
        let target = board.at(to);
        if (target != null) {
            if (piece.isSameOwnerWith(target)) return false;
        }
        // special rules for each type of pieces
        switch (piece.type) {
            case PIECE.King:
                return Rule.isLegalKingMove(move, piece.owner, board);
            case PIECE.Guard:
                return Rule.isLegalGuardMove(move, piece.owner, board);
            case PIECE.Bishop:
                return Rule.isLegalBishopMove(move, piece.owner, board);
            case PIECE.Knight:
                return Rule.isLegalKnightMove(move, board);
            case PIECE.Rook:
                return Rule.isLegalRookMove(move, board);
            case PIECE.Cannon:
                return Rule.isLegalCannonMove(move, board);
            case PIECE.Pawn:
                return Rule.isLegalPawnMove(move, piece.owner, board);
            default:
                throw new Error("Unkown Piece Type!");
        }
    }
    // special rules for each piece type
    private static isLegalCannonMove(move: Move, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        let dx = to.x - from.x,
            dy = to.y - from.y;
        // on same file or rank
        if (dx != 0 && dy != 0) return false;
        let steps = Math.abs(dx) || Math.abs(dy);
        let unitX = dx == 0 ? 0 : (dx > 0 ? 1 : -1),
            unitY = dy == 0 ? 0 : (dy > 0 ? 1 : -1);
        let pos = from.clone();
        let intervening = 0;
        for (let i = 1; i < steps; ++i) { // count intervening pieces
            pos.moveBy(unitX, unitY);
            if (!board.empty(pos)) ++intervening;
            if (intervening > 1) return false; // more than one intervening pieces
        }
        // general move with no intervening pieces;
        // attack move with exact one intervening piece
        return board.empty(to) ? intervening === 0 : intervening === 1;
    }
    private static isLegalRookMove(move: Move, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        let dx = to.x - from.x,
            dy = to.y - from.y;
        // same file or rank 
        if (dx != 0 && dy != 0) return false;
        let steps = Math.abs(dx) || Math.abs(dy);
        let unitX = dx == 0 ? 0 : (dx > 0 ? 1 : -1),
            unitY = dy == 0 ? 0 : (dy > 0 ? 1 : -1);
        let pos = from.clone();
        for (let i = 1; i < steps; ++i) {
            pos.moveBy(unitX, unitY);
            if (!board.empty(pos)) return false; // at least one intervening piece
        }
        return true; // with no intervening pieces
    }
    private static isLegalBishopMove(move: Move, owner: PLAYER, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        // should not cross the river
        if (Rule.isCrossRiver(from, owner, board) || Rule.isCrossRiver(to, owner, board)) return false;
        let dx = to.x - from.x,
            dy = to.y - from.y;
        if (Math.abs(dx) != 2 || Math.abs(dy) != 2) return false;
        let pos = new Point(from.x + dx / 2, from.y + dy / 2);
        return board.empty(pos);
    }
    private static isLegalKingMove(move: Move, owner: PLAYER, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        // king should stay in owner's castle
        if (!Rule.isInCastle(from, owner, board) || !Rule.isInCastle(to, owner, board)) return false;
        let dx = to.x - from.x,
            dy = to.y - from.y;
        if (Math.abs(dx) + Math.abs(dy) != 1) return false;
        return true;
    }
    private static isLegalGuardMove(move: Move, owner: PLAYER, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        // guard should stay in owner's castle
        if (!Rule.isInCastle(from, owner, board) || !Rule.isInCastle(to, owner, board)) return false;
        let dx = to.x - from.x,
            dy = to.y - from.y;
        if (Math.abs(dx) != 1 || Math.abs(dy) != 1) return false;
        return true;
    }
    private static isLegalKnightMove(move: Move, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        let dx = to.x - from.x,
            dy = to.y - from.y;
        if (dx == 0 || dy == 0 || Math.abs(dx) + Math.abs(dy) != 3) return false;
        let pos = from.clone();
        if (Math.abs(dx) == 2) pos.x += dx / 2;
        else pos.y += dy / 2;
        return board.empty(pos);
    }
    private static isLegalPawnMove(move: Move, owner: PLAYER, board: BoardBase): boolean {
        let from = move.from,
            to = move.to;
        let dx = to.x - from.x,
            dy = to.y - from.y;
        // before crossing river, move only forward
        if (!Rule.isCrossRiver(from, owner, board) && dx != 0) return false;
        // move backward is not allowed
        if (owner === board.upSidePlayer && dy < 0) return false;
        else if (owner === board.blewSidePlayer && dy > 0) return false;
        if (Math.abs(dx) + Math.abs(dy) != 1) return false;
        return true;
    }
    //
    static getPossibleMoves(board: BoardBase, currentMoverOnly: boolean = true): Array<Move> {
        let allMoves: Array<Move> = [],
            pos = new Point(0, 0);
        for (let i = 0; i < SIZE.files; i++) {
            for (let j = 0; j < SIZE.ranks; j++) {
                pos.moveTo(i, j);    
                let piece = board.at(pos);
                if (piece == null) continue;
                if (currentMoverOnly && piece.owner != board.currentMover) continue;
                let moves: Array<Move> = [];
                switch (piece.type) {
                    case PIECE.King:
                        moves = Rule.getKingPossibleMoves(piece, pos, board);
                        break;
                    case PIECE.Guard:
                        moves = Rule.getGuardPossibleMoves(piece, pos, board);
                        break;
                    case PIECE.Bishop:
                        moves = Rule.getBishopPossibleMoves(piece, pos, board);
                        break;
                    case PIECE.Knight:
                        moves = Rule.getKnightPossibleMoves(piece, pos, board);
                        break;
                    case PIECE.Rook:
                        moves = Rule.getRookPossibleMoves(piece, pos, board);
                        break;
                    case PIECE.Cannon:
                        moves = Rule.getCannonPossibleMoves(piece, pos, board);
                        break;
                    case PIECE.Pawn:
                        moves = Rule.getPawnPossibleMoves(piece, pos, board);
                        break;
                    default:
                        throw new Error("Unkown Piece Type!");
                }
                allMoves = allMoves.concat(moves);
            }
        }
        if (currentMoverOnly) return allMoves.filter((move: Move) => move.protege == null);
        return allMoves;
    }
    private static possibleMove(piece: Piece, from: Point, to: Point, relate: Piece | null): Move {
        let move = new Move(from.clone(), to.clone()); // general move
        if (relate != null) {
            if (piece.isSameOwnerWith(relate)) move.guard(relate.type); // guard a piece
            else move.attack(relate.type); // attack a piece
        }
        return move;
    }
    // NOTE:: for high performace, is should not use legality checker above.
    private static getKingPossibleMoves(piece: Piece, pos: Point, board: BoardBase): Array<Move> {
        let moves: Array<Move> = [];
        let from = pos.clone();
        // test 4 directions
        [[-1, 0], [0, -1], [1, 0], [0, 1]].forEach((d) => {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                if (Rule.isInCastle(pos, piece.owner, board)) {
                    moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                }
            }
        });
        return moves;
    }
    private static getGuardPossibleMoves(piece: Piece, pos: Point, board: BoardBase): Array<Move> {
        let moves: Array<Move> = [];
        let from = pos.clone();
        // test 4 directions
        [[-1, 1], [1, -1], [1, 1], [-1, -1]].forEach((d) => {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                if (Rule.isInCastle(pos, piece.owner, board)) {
                    moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                }
            }
        });
        return moves;
    }
    private static getBishopPossibleMoves(piece: Piece, pos: Point, board: BoardBase): Array<Move> {
        let moves: Array<Move> = [];
        let from = pos.clone();
        // test 4 directions
        [[-2, 2], [2, -2], [2, 2], [-2, -2]].forEach((d) => {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                if (!this.isCrossRiver(pos, piece.owner, board)) {
                    // not blocking the elephant's eye
                    if (board.empty(new Point(from.x + d[0] / 2, from.y + d[1] / 2))) {
                        moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                    }
                }
            }
        });
        return moves;
    }
    private static getKnightPossibleMoves(piece: Piece, pos: Point, board: BoardBase): Array<Move> {
        let moves: Array<Move> = [];
        let from = pos.clone();
        // test 8 directions
        [[1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2]].forEach((d) => {
            pos.moveTo(from.x + d[0], from.y + d[1]);
            if (!Rule.isOutsideBoard(pos)) {
                let hobble = d.map(x => x > 0 ? Math.floor(x / 2) : Math.ceil(x / 2));
                // not hobbling the horse's leg
                if (board.empty(new Point(from.x + hobble[0], from.y + hobble[1]))) {
                    moves.push(Rule.possibleMove(piece, from, pos, board.at(pos)));
                }
            }
        });
        return moves;
    }
    private static getRookPossibleMoves(piece:Piece, pos: Point, board: BoardBase): Array<Move> {
        let moves: Array<Move> = [];
        let from = pos.clone();
        // test 4 directions
        [[-1, 0], [1, 0], [0, 1], [0, -1]].forEach((d) => {
            let to = new Point(from.x + d[0], from.y + d[1]);
            while (!Rule.isOutsideBoard(to) && board.empty(to)) {
                moves.push(new Move(from.clone(), to.clone()));
                to.moveBy(d[0], d[1]);
            }
            if (!Rule.isOutsideBoard(to)) { // attack or guard
                moves.push(Rule.possibleMove(piece, from, to, board.at(to)));
            }
        });
        return moves;
    }
    private static getPawnPossibleMoves(piece: Piece, pos: Point, board: BoardBase): Array<Move> {
        let moves: Array<Move> = [];
        let from = pos.clone();
        // test 4 directions
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach((d) => {
            // not backword
            if ((piece.isOwnedBy(board.upSidePlayer) && d[1] != -1) ||
                (piece.isOwnedBy(board.blewSidePlayer) && d[1] != 1)) {
                // cross river or forward
                if (Rule.isCrossRiver(from, piece.owner, board) || d[0] == 0) {
                    let to = new Point(from.x + d[0], from.y + d[1]);
                    if (!Rule.isOutsideBoard(to)) { // attack or guard
                        moves.push(Rule.possibleMove(piece, from, to, board.at(to)));
                    }
                }
            }
        });
        return moves;
    }
    private static getCannonPossibleMoves(piece:Piece, pos: Point, board: BoardBase): Array<Move> {
        let moves: Array<Move> = [];
        let from = pos.clone();
        // test 4 directions
        [[-1, 0], [1, 0], [0, 1], [0, -1]].forEach((d) => {
            let to = new Point(from.x + d[0], from.y + d[1]);
            while (!Rule.isOutsideBoard(to) && board.empty(to)) {
                moves.push(new Move(from.clone(), to.clone()));
                to.moveBy(d[0], d[1]);
            }
            if (!Rule.isOutsideBoard(to)) to.moveBy(d[0], d[1]);
            while (!Rule.isOutsideBoard(to) && board.empty(to)) {
                to.moveBy(d[0], d[1]);
            }
            // attack or guard
            if (!Rule.isOutsideBoard(to)) {
                moves.push(Rule.possibleMove(piece, from, to, board.at(to)));
            }
        });
        return moves;
    }
}
