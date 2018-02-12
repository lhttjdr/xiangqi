import Move from './common/Move';
import Point from './common/Point';
import Piece from './UI/Piece';

export default abstract class ManagerBase {
    // UI changed --> logical board change
    public abstract doMove(move: Move): void;

    // UI action <-- ask logical board
    public abstract isLegalMove(move: Move): boolean;
    public abstract isValidPosition(pos: Point): boolean;
}