import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

import HistoryHeuristic from '../HistoryHeuristic';
import { ENTRYTYPE, Item, TranspositionTable } from '../TranspositionTable';
import { mergeSort } from '../../common/tools';


// NegaScout with history heuristic, transposition table and iterative deepening improvement
export default class IterativeDeepeningNegaScout_TT_HH extends SearchEngine{
    private TT: TranspositionTable;
    private HH: HistoryHeuristic;
    private timeStart: number = 0; // time in milliseconds
    private timeLimit: number = 0;
    private currentMaxDepth: number = 0; // iterative deepening
    private timeOut: boolean = false; // terminate search
    private backupBestMove: Move | null = null;
    private backupScore: number = 0;
    constructor() {
        super();
        this.TT=new TranspositionTable(20);
        this.HH=new HistoryHeuristic();
    }
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
            this.HH.clear();
            this.TT.hash(board);
            this.currentBoard = board.clone();
            let score = this.negascout(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
            if (this.timeOut) break;
            this.backupScore = score;
            if (this.bestMove != null) this.backupBestMove = this.bestMove!.clone();
            this.maxDepth += 1;
        }
        this.setStatus(this.backupScore);
        console.log("score:" + this.backupScore);
        console.log("time:" + (new Date().getTime() - this.timeStart).toString() + "ms");
        console.log("depth:" + (this.maxDepth - 1));
        return this.backupBestMove;
    }
    private negascout(depth: number, alpha: number, beta: number): number {
        if (this.timeOut) return 0; // time out
        if (new Date().getTime() - this.timeStart >= this.timeLimit) {
            this.timeOut = true;
            return 0;
        };
        let isOwn = ((this.maxDepth - depth) % 2 == 0);
        let score = this.quickEvaluate(this.maxDepth - depth);
        if (score != 0) return score; // terminal node
        // look-up in transposition table
        let item = this.TT.lookup(alpha, beta, depth, isOwn);
        if (item != null) return item.score;

        if (depth <= 0) { // Leaf
            score = this.evaluator.evaluate(this.currentBoard);
            this.TT.update(ENTRYTYPE.Exact, score, depth, isOwn);
            return score;
        }

        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }
        // adjust order according to history 
        mergeSort(possible, (a: Move, b: Move) => this.HH.get(a) > this.HH.get(b));

        let isFirstNode = true;
        // suppose fail low, for all chindren, score < alpha
        // alpha will not be updated by score, and finally alpha is the upper bound of score
        let entryType = ENTRYTYPE.UpperBound;
        for (let move of possible) {
            // update hash key
            let piece = this.currentBoard.at(move.from);
            if (piece == null) throw Error("Invalid Move!");
            let target = this.currentBoard.at(move.to);
            this.TT.hashMove(move, piece, target);
            // simulate
            this.doMove(move);

            if (isFirstNode) { // the first node is full window search
                score = -this.negascout(depth - 1, -beta, -alpha);
                isFirstNode = false;
            } else { // for the fallowing node，if fail high, re-search
                score = -this.negascout(depth - 1, -(alpha + 1), -alpha); // search with a null window
                if (alpha < score && score < beta) { // if it failed high
                    score = -this.negascout(depth - 1, -beta, -score); // do a narrow window re-search
                     // alpha = score satisfying the inequality alpha (passed in) < score < beta is an exact value
                    entryType = ENTRYTYPE.Exact;
                }
            }
            this.TT.hashUndoMove(move, piece, target);
            this.undoMove();
            if (score > alpha) {// alpha = max(alpha, score)
                alpha = score;
                if (depth == this.maxDepth) {
                    this.bestMove = move.clone();
                }
            }
            if (alpha > beta) {// beta cut-off
                // alpha = score > beta, the real score is not in range [alpha (passed in), beta]
                // the score is greater than beta, and alpha (current) is the lower boud of score
                entryType = ENTRYTYPE.LowerBound;
            }
        }
        this.TT.update(entryType, alpha, depth, isOwn);
        if (this.bestMove != null) {
            this.HH.update(this.bestMove, this.currentMaxDepth - depth);
        }
        return alpha;
    }
}