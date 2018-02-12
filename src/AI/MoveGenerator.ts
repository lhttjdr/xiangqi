import Board from '../common/Board';
import Move from '../common/Move';

export default abstract class MoveGenerator{
    abstract getPossibleMoves(board: Board): Array<Move>;
}
