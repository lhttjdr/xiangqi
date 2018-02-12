import Point from './Point';
import Piece from './Piece';
import Move from './Move';
import BoardBase from './BoardBase';
import Rule from './Rule';
import { SIZE, PLAYER, STATUS, pos2idx } from './define';

// abstract logical game board
export default class Board extends BoardBase{
    // update
    doMove(move: Move): void {
        if (move.from.equals(move.to)) return;
        if (!Rule.isLegalMove(move, this)) { 
            console.log(this.toString());
            console.log(move.toString());
            throw new Error("Invalid Move!");
        }
        let from = move.from,
            to = move.to;
        let target = this.at(to);
        if (target != null) move.attack(target.type);
        this.set(to, this.at(from));
        this.set(from, null);
        this.history.push(move);
        this.switchMover();
    }
    undoMove(): void {
        if (this.history.length == 0) {
            throw new Error("No previus move!!!");
        }
        let move = this.history.pop();
        if (typeof move != "undefined") {
            let from = move.from,
                to = move.to;
            this.set(from, this.at(to));
            if (move.target != null) {
                this.set(to, new Piece(this.currentMover, move.target));
            } else {
                this.set(to, null);
            }
            this.switchMover();
        }
    }
    //
    quickTestStatus(): STATUS {
        return Rule.quickTestStatus(this);
    }
    //
    public clone(): Board {
        let board = new Board();
        board.upSide = this.upSide;
        board.mover = this.mover;
        for (let x = 0; x < SIZE.files; ++x) {
            for (let y = 0; y < SIZE.ranks; ++y) {
                let idx = pos2idx(x, y);
                let piece = this.boardMap[idx];
                if (piece != null) {
                    board.boardMap[idx] = piece.clone();
                }
            }
        }
        return board;
    }
};
