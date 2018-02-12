import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

// 
export default class IterativeDeepeningPVS extends SearchEngine {
    private timeStart: number = 0; // time in milliseconds
    private timeLimit: number = 0;
    private currentMaxDepth: number = 0; // iterative deepening
    private timeOut: boolean = false; // terminate search
    private backupBestMove: Move | null = null;
    private backupScore: number = 0;
    constructor() {
        super();
    };
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        console.log(board.toString());
        this.timeOut = false;
        this.timeStart = (new Date()).getTime();
        this.timeLimit = timeLimit;
        this.bestMove = null;
        this.backupBestMove = null;
        this.maxDepth = 1;
        while (!this.timeOut) {
            this.bestMove = null;
            this.currentBoard = board.clone();
            let score = this.pvs(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
            if (this.timeOut) break;
            this.backupScore = score;
            if(this.bestMove!=null) this.backupBestMove = this.bestMove!.clone();
            this.maxDepth += 1;
        }
        this.setStatus(this.backupScore);
        console.log("score:" + this.backupScore);
        console.log("time:" + (new Date().getTime() - this.timeStart).toString() + "ms");
        console.log("depth:" + (this.maxDepth - 1));
        return this.backupBestMove;
    }
    private pvs(depth: number, alpha: number, beta: number): number {
        if (this.timeOut) return 0; // time out
        if (new Date().getTime() - this.timeStart >= this.timeLimit) {
            this.timeOut = true;
            return 0;
        };
        let score = this.quickEvaluate(this.maxDepth - depth);
        if (score != 0) return score; // terminal node
        if (depth <= 0) { // Leaf
            score = this.evaluator.evaluate(this.currentBoard);
            return score;
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
};