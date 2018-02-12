import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

// Another optimization of alpha-beta search, John Philip Fishburn, 1983
// different from fail-hard alpha-beta
// 
// fail hard : alpha <= score <= beta (hard condition)
// It requires a full window to ensure score can be found, 
// so usually start search with window [-inf, inf].
// 
// fail soft :
// (1) for alpha <= score <= beta, return score (exact)
// (2) for score < alpha, return upper bound of score (fail high)
// (3) for score > beta, return lower bound of score (fail low)
// We can start search with small window [alpha, beta] to get more nodes cut off.
// If fails, we can try a new window according returned information.

export default class FailSoftAlphaBeta extends SearchEngine {
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
    private alphabeta(depth, alpha, beta) {
        let score = this.quickEvaluate(this.maxDepth - depth); // quick evaluation
        if (score != 0) return score; // WIN or LOSS
        if (depth == 0) // Leaf
            return this.evaluator.evaluate(this.currentBoard);
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }

        let current = this.evaluator.LOST; // -inf
        for (let move of possible) {
            this.doMove(move);
            score = -this.alphabeta(depth - 1, -beta, -alpha);
            this.undoMove();
            if (score > current) {  // current = max(current, score)
                current = score;
                if (depth === this.maxDepth) { // root
                    this.bestMove = move.clone();
                }
                if (score > alpha) {
                    alpha = score;
                }
                if (alpha >= beta) break; // beta pruning
            }
        }
        return current; // maximum
    }
};