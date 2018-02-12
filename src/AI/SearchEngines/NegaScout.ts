import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

import HistoryHeuristic from '../HistoryHeuristic';
import { ENTRYTYPE, Item, TranspositionTable } from '../TranspositionTable';
import { mergeSort } from '../../common/tools';

// NegaScout is an Alpha-Beta enhancement and improvement of Judea Pearl's Scout-algorithm,
// introduced by Alexander Reinefeld in 1983. 
// An Improvement to the Scout Tree- Search Algorithm.ICCA Journal, Vol. 6, No. 4

// While re-searching, NegaScout uses the narrow window of {score, beta}.
// It trusts the null-window score, even if the re-search doesn't confirm the alpha increase,
// eventually due to search instability.
// 
// Dealing with search instability, PVS re-search with {alpha, beta }.
// 
// Practically, due to Quiescence Search, and fail- soft implementations of PVS, 
// the two algorithms are essentially equivalent to each other - they expand the same search tree. 


export default class NegaScout extends SearchEngine {
    constructor() {
        super();
    }
    searchAGoodMove(board: Board, timeLimit: number): Move | null{
        let timeCount = (new Date()).getTime();
        this.bestMove = null;
        this.currentBoard = board.clone();
        let score = this.negascout(this.maxDepth, this.evaluator.LOST, this.evaluator.WIN);
        this.setStatus(score);

        console.log(this.currentBoard.toString());
        console.log("score:" + score);
        console.log((new Date().getTime() - timeCount).toString() + "ms");
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private negascout(depth: number, alpha: number, beta: number): number {
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
                score = -this.negascout(depth - 1, -beta, -alpha);
                isFirstNode = false;
            } else { // for the fallowing node，if fail high, re-search
                score = -this.negascout(depth - 1, -(alpha + 1), -alpha); // search with a null window
                if (alpha < score && score < beta) { // if it failed high
                    score = -this.negascout(depth - 1, -beta, -score); // do a narrow window re-search
                }
            }
            this.undoMove();
            if (score > alpha) {// alpha = max(alpha, score)
                alpha = score;
                if (depth == this.maxDepth) {
                    this.bestMove = move.clone();
                }
            }
            if (alpha > beta) break; // beta cut-off
        }
        return alpha;
    }
}