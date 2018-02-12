import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';
import { STATUS } from '../../common/define';

export default class Aspiration extends SearchEngine {
    constructor() {
        super();
    };
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        let timeCount = (new Date()).getTime();
        this.bestMove = null;
        this.currentBoard = board.clone();
        let maxDepth = this.maxDepth;
        // guess score
        this.maxDepth = maxDepth - 1;
        let score = this.alphabeta(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
        this.setStatus(score);
        if (this.STATUS == STATUS.NotEnded) {
            // fail soft search
            this.maxDepth = maxDepth;
            let alpha = score - 100, beta = score + 100;
            score = this.alphabeta(this.maxDepth, alpha, beta);
            if (score < alpha) { // fail low
                score = this.alphabeta(this.maxDepth, this.evaluator.LOST, score);
            } else if (score > beta) { // fail high
                score = this.alphabeta(this.maxDepth, score, this.evaluator.WIN);
            }
            this.setStatus(score);
        }
       
        console.log(this.currentBoard.toString());
        console.log("score:" + score);
        console.log((new Date().getTime() - timeCount).toString() + "ms");
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private alphabeta(depth, alpha, beta) {
        let score = this.quickEvaluate(this.maxDepth - depth); // quick evaluation
        if (score != 0) return score; // WIN or LOSS
        if (depth == 0)// Leaf
            return this.evaluator.evaluate(this.currentBoard);
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }

        let current = this.evaluator.LOST; // -inf
        for (let move of possible) {
            this.doMove(move);
            score = -this.alphabeta(depth - 1, -beta, -alpha);
            if (score <= -19900 || score >= 19900) {
                console.log(this.currentBoard.toString());
                console.log(depth);
                console.log(score);
            }
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