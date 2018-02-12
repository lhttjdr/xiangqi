import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';


// Principal variation search
// Tony Marsland, Murray Campbell (1982). Parallel Search of Strongly Ordered Game Trees. ACM Comput. Surv. 14(4): 533-551

export default class PrincipalVariationSearch extends SearchEngine {
    constructor() {
        super();
    }
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        let timeCount = (new Date()).getTime();
        this.bestMove = null;
        this.currentBoard = board.clone();
        let score = this.pvs(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
        this.setStatus(score);

        console.log(this.currentBoard.toString());
        console.log("score:" + score);
        console.log((new Date().getTime() - timeCount).toString() + "ms");
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private pvs(depth: number, alpha: number, beta: number): number {
        let score = this.quickEvaluate(this.maxDepth - depth);
        if (score != 0) return score; // terminal node
        if (depth <= 0) { // Leaf
            return this.evaluator.evaluate(this.currentBoard);
        }
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }

        let isFirstNode = true;
        for (let move of possible) {
            this.doMove(move);
            if (isFirstNode) { // the first node is full window search
                score = -this.pvs(depth - 1, -beta, -alpha);
                isFirstNode = false;
            } else { // for the fallowing node，if fail high, re-search
                score = -this.pvs(depth - 1, -(alpha + 1), -alpha); // search with a null window
                if (alpha < score && score < beta) { // if it failed high
                    score = -this.pvs(depth - 1, -beta, -alpha); // do a full re-search
                }
            }
            this.undoMove();
            if (score > alpha) {// alpha = max(alpha, score)
                alpha = score;
                if (depth === this.maxDepth) { // root
                    this.bestMove = move.clone();
                }
            }
            if (alpha > beta) break; // beta cut-off
        }
        return alpha;
    }
}