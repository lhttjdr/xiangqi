import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

// 
export default class IterativeDeepeningAlphaBeta extends SearchEngine {
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
        this.backupBestMove = null;
        this.maxDepth = 1;
        while (true) {
            this.bestMove = null;
            this.currentBoard = board.clone();
            let score = this.alphabeta(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
            if (this.timeOut) break;
            this.backupScore = score;
            if (this.bestMove != null) {
                this.backupBestMove = this.bestMove!.clone();
            }
            this.maxDepth += 1;
        }
        this.setStatus(this.backupScore);
        console.log("score:" + this.backupScore);
        console.log("time:" + (new Date().getTime() - this.timeStart).toString() + "ms");
        console.log("depth:" + (this.maxDepth - 1));
        return this.backupBestMove;
    }
    private alphabeta(depth, alpha, beta) {
        if (this.timeOut) return 0; // time out
        if (new Date().getTime() - this.timeStart >= this.timeLimit) {
            this.timeOut = true;
            return 0;
        };

        let score = this.quickEvaluate(this.maxDepth - depth); // quick evaluation
        if (score != 0) return score; // WIN or LOSS
        if (depth == 0) // Leaf
            return this.evaluator.evaluate(this.currentBoard);
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }

        for (let move of possible) {
            this.doMove(move);
            score = -this.alphabeta(depth - 1, -beta, -alpha);
            if (score == 20000 || score == -20000) {
                console.log(this.currentBoard.toString());
            }
            this.undoMove();
            if (score >= beta) return beta; // fail hard beta cut-off
            if (score > alpha) { // alpha = max(alpha, score)
                alpha = score;
                if (depth === this.maxDepth) { // root
                    this.bestMove = move.clone();
                    console.log("*");
                }
            }
        }
        return alpha; // maximum
    }
};