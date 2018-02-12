import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

// alpha-beta pruning
// Alexander Brudno, 1963
export default class AlphaBetaMiniMax extends SearchEngine {
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
        console.log("score:" + score);
        console.log((new Date().getTime() - timeCount).toString() + "ms");
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private alphabeta(depth: number, alpha: number, beta: number) {
        let layer = this.maxDepth - depth;
        let isMaxLayer = (layer % 2 == 0); // own
        let score = this.quickEvaluate(layer); // quick evaluation
        if (score != 0) return isMaxLayer ? score : -score; // WIN or LOSS
        if (depth == 0) {// Leaf
            score = this.evaluator.evaluate(this.currentBoard);
            return isMaxLayer ? score : -score;
        }
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            score = this.stalemate(this.maxDepth - depth);
            return isMaxLayer ? score : -score;
        }
        if (isMaxLayer) { // max
            for (let move of possible) {
                this.doMove(move);
                score = this.alphabeta(depth - 1, alpha, beta);
                this.undoMove();
                if (score > alpha) { // alpha = max(alpha, score)
                    alpha = score;
                    if (depth === this.maxDepth) { // root
                        this.bestMove = move.clone();
                    }
                }
                if (alpha >= beta) return beta; // beta pruning
            }
            return alpha; // maximum
        } else { // min
            for (let move of possible) {
                this.doMove(move);
                score = this.alphabeta(depth - 1, alpha, beta);
                this.undoMove();
                if (score < beta) { // beta = min(beta, score)
                    beta = score;
                }
                if (alpha >= beta) return alpha; // alpha pruning
            }
            return beta; // minimum
        }
    }
};