import Board from '../../common/Board';
import Move from '../../common/Move';
import Rule from '../../common/Rule';
import MoveGenerator from '../MoveGenerator';

export default class SimpleMoveGenerator extends MoveGenerator {
    getPossibleMoves(board: Board): Array<Move> {
        return Rule.getPossibleMoves(board, true);
    }
}
