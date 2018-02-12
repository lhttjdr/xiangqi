import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

// Negamax with alpha-beta pruning
// Knuth and Moore, 1975
export default class AlphaBeta extends SearchEngine {
    constructor() {
        super();
    };
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        let timeCount = (new Date()).getTime();
        this.bestMove = null;
        this.currentBoard = board.clone();
        let score = this.alphabeta(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
        this.setStatus(score);

        console.log(this.currentBoard.toString());
        console.log("score:"+score);
        console.log((new Date().getTime() - timeCount).toString() + "ms");
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private alphabeta(depth: number, alpha: number, beta: number): number {
        let score = this.quickEvaluate(this.maxDepth - depth); // quick evaluation
        if (score != 0) return score; // terminal node
        if (depth === 0) // Leaf
            return this.evaluator.evaluate(this.currentBoard);
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }

        for (let move of possible) {
            this.doMove(move);
            score = -this.alphabeta(depth - 1, -beta, -alpha);
            this.undoMove();
            if (score >= beta) return beta; // beta pruning
            if (score > alpha) { // alpha = max(alpha, score)
                alpha = score;
                if (depth === this.maxDepth) { // root
                    this.bestMove = move.clone();
                }
            }
        }
        return alpha; // maximum
    }
};