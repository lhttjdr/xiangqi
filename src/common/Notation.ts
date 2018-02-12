import Board from './Board';
import Move from './Move';
import Piece from './Piece';
import Point from './Point';
import Rule from './Rule';
import { PLAYER, SIZE, PIECE, character } from './define';

export default class Notation {
    private static ArabicNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    private static ChineseNumber = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    public static notatioin(move: Move, board: Board): string {
        let piece = board.at(move.from);
        if (piece == null) throw Error("Piece Not Found!");
        return this.getUniquePieceName(move.from, piece, board) + this.getActionName(move, piece, board);
    }
    private static getUniquePieceName(pos: Point, piece: Piece, board: Board): string {
        let name = character(piece.type, piece.owner);
        if (piece.type == PIECE.King) return name + Notation.getFileName(pos, piece, board);
        let ys: Array<number> = [];
        let p = new Point(pos.x, 0);
        for (; p.y < SIZE.ranks; p.y += 1) {
            let pi = board.at(p);
            if (pi == null) continue;
            if (piece.equals(pi)) ys.push(p.y);
        }
        if (ys.length == 1) {
            return name + Notation.getFileName(pos, piece, board);
        }
        if (ys.length == 2) {
            if (ys[0] === pos.y) {
                if (piece.isOwnedBy(board.upSidePlayer)) return "前" + name;
                else return "後" + name;
            } else {
                if (piece.isOwnedBy(board.blewSidePlayer)) return "前" + name;
                else return "後" + name;
            }
        }
        // more than 2, must be pawn
        // check if other files have more than one pawn
        let otherFileWithMultiplePawn = false;
        for (let x = 0; x < SIZE.files; ++x){
            if (x == pos.x) continue;
            let count = 0;
            for (let y = 0; y < SIZE.ranks; ++y) {
                let p = board.at(new Point(x, y));
                if (p == null) continue;
                if (piece.equals(p)) {
                    ++count;
                    if (count >= 2) {
                        otherFileWithMultiplePawn = true;
                        break;
                    }
                }
            }
        }
        if (otherFileWithMultiplePawn) { // omit piece name
            name = Notation.getFileName(pos, piece, board);
        }
        let len = ys.length;
        if (ys[0] === pos.y) {
            if (piece.isOwnedBy(board.upSidePlayer)) return "前" + name;
            else return "後" + name;
        } else if (ys[len - 1] === pos.y) {
            if (piece.isOwnedBy(board.blewSidePlayer)) return "前" + name;
            else return "後" + name;
        } else if (ys.length === 3) {
            return "中" + name;
        } else { // more than three
            if (piece.isOwnedBy(board.upSidePlayer)) {
                if (ys[1] == pos.y) return "二" + name;
                if (ys[2] == pos.y) return "三" + name;
                if (ys[3] == pos.y) return "四" + name;
            } else {
                if (ys[len-2] == pos.y) return "二" + name;
                if (ys[len-3] == pos.y) return "三" + name;
                if (ys[len-4] == pos.y) return "四" + name;
            }
        }
        throw Error("Impossible Piece Type!");
    }
    // From thier own view, number files from right to left. 
    // Red use Chinese number, Black use Arabic number.
    private static getFileName(pos: Point, piece: Piece, board: Board): string {
        if (piece.isOwnedBy(board.upSidePlayer)) {
            if (piece.owner === PLAYER.Red) return Notation.ChineseNumber[pos.x];
            else return Notation.ArabicNumber[pos.x];
        } else {
            if (piece.owner === PLAYER.Red) return Notation.ChineseNumber[SIZE.files - pos.x - 1];
            else return Notation.ArabicNumber[SIZE.files - pos.x - 1];
        }
    }
    private static getActionName(move: Move, piece: Piece, board: Board) {
        if (move.from.y == move.to.y) {
            return "平" + Notation.getFileName(move.to, piece, board);
        }
        let actionArg: string;
        if (piece.type == PIECE.Guard || piece.type == PIECE.Bishop || piece.type == PIECE.Knight) {
            actionArg = Notation.getFileName(move.to, piece, board);
        } else { // who need count steps
            let steps = Math.abs(move.from.y - move.to.y);
            if (piece.owner == PLAYER.Red) actionArg = Notation.ChineseNumber[steps - 1];
            else actionArg = Notation.ArabicNumber[steps - 1];
        }
        if (piece.isOwnedBy(board.upSidePlayer)) {
            if (move.from.y < move.to.y) return "進" + actionArg;
            else return "退" + actionArg;
        } else {
            if (move.from.y > move.to.y) return "進" + actionArg;
            else return "退" + actionArg;
        }
    }
}