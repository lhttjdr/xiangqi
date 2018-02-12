import { PIECE } from './define'; 
import Point from './Point';

// move a piece
export default class Move{
    from: Point;
    to: Point;
    target: PIECE | null;
    protege: PIECE | null;
    constructor(from: Point, to: Point) {
        this.from = from.clone();
        this.to = to.clone();
        this.target = null;
        this.protege = null;
    }
    attack(piece: PIECE | null): void {
        this.target = piece;
    }
    guard(piece: PIECE | null): void {
        this.protege = piece;
    }
    toString(): string {
        return this.from.toString() + "-->" + this.to.toString();
    }
    clone(): Move {
        let move = new Move(this.from, this.to);
        move.attack(this.target);
        move.guard(this.protege);
        return move;
    }
}
