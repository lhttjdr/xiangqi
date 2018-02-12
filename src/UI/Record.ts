import Point from '../common/Point';
import Move from '../common/Move';
import Piece from './Piece';

// something very similar to Move but used in Board UI
export default class Record {
    public from: Point;
    public to: Point;
    public piece: Piece | null;
    constructor(move: Move, piece: Piece | null = null) {
        this.from = move.from.clone();
        this.to = move.to.clone();
        this.piece = piece;
    }
}