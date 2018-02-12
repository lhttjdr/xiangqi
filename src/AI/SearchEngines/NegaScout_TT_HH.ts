import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

import HistoryHeuristic from '../HistoryHeuristic';
import { ENTRYTYPE, Item, TranspositionTable } from '../TranspositionTable';
import { mergeSort } from '../../common/tools';


// NegaScout with history heuristic, transposition table and iterative deepening improvement
export default class IterativeDeepeningNegaScout_TT_HH extends SearchEngine {
    private TT: TranspositionTable;
    private HH: HistoryHeuristic;
    constructor() {
        super();
        this.TT = new TranspositionTable(20);
        this.HH = new HistoryHeuristic();
    }
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        let timeStart = new Date().getTime();
        console.log(board.toString());
        this.bestMove = null;
        this.HH.clear();
        this.TT.hash(board);
        this.currentBoard = board.clone();
        let score = this.negascout(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
        this.setStatus(score);
        console.log("score:" + score);
        console.log("time:" + (new Date().getTime() - timeStart).toString() + "ms");
        console.log("timeLimit:" + timeLimit + "ms");
        return this.bestMove;
    }
    private negascout(depth: number, alpha: number, beta: number): number {
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
            this.HH.update(this.bestMove, depth);
        }
        return alpha;
    }
}