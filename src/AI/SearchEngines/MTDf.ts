import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

import { ENTRYTYPE, Item, TranspositionTable } from '../TranspositionTable';

export default class MTDf extends SearchEngine {
    private TT: TranspositionTable;
    private backupBestMove: Move | null = null;
    constructor() {
        super();
        this.TT = new TranspositionTable(20);
    }
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        let timeCount = (new Date()).getTime();
        this.bestMove = null;
        this.TT.hash(board);
        this.currentBoard = board.clone();
        let guess = 0;
        let maxDepth = this.maxDepth;
        for (this.maxDepth = 1; this.maxDepth <= maxDepth; this.maxDepth += 1) {
            guess = this.mtdf(guess, this.maxDepth);
        }
        this.setStatus(guess);

        console.log(this.currentBoard.toString());
        console.log("score:" + guess);
        console.log((new Date().getTime() - timeCount).toString() + "ms");
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private mtdf(guess: number, depth: number): number {
        let g = guess;
        let lowerbound = this.evaluator.LOST;
        let upperbound = this.evaluator.WIN;
        while (lowerbound < upperbound) {
            if (this.bestMove != null) this.backupBestMove = this.bestMove.clone();
            let beta = g;
            if (g == lowerbound) beta += 1; // step = 1
            g = this.alphabeta(depth, beta - 1, beta); // null window
            if (g < beta) upperbound = g; // fail low
            else lowerbound = g; // fail high
            console.log("[" + lowerbound + ", " + upperbound + "]");
        }
        return g;
    }
    // fail soft alphabeta algorithm
    private alphabeta(depth, alpha, beta) {
        let score = this.quickEvaluate(this.maxDepth - depth); // quick evaluation
        if (score != 0) return score; // WIN or LOSS
        let isOwn = (this.maxDepth - depth) % 2 == 0;

        let item = this.TT.lookup(alpha, beta, depth, isOwn);
        if (item !== null) return item.score;

        if (depth == 0) {// Leaf
            score = this.evaluator.evaluate(this.currentBoard);
            this.TT.update(ENTRYTYPE.Exact, score, depth, isOwn);
            return score;
        }
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }


        let current = this.evaluator.LOST; // -inf
        let entryType = ENTRYTYPE.UpperBound;
        for (let move of possible) {
            // update hash key
            let piece = this.currentBoard.at(move.from);
            if (piece == null) throw Error("Invalid Move!");
            let target = this.currentBoard.at(move.to);
            this.TT.hashMove(move, piece, target);
            // simulate
            this.doMove(move);

            score = -this.alphabeta(depth - 1, -beta, -alpha);
            this.TT.hashUndoMove(move, piece, target);
            this.undoMove();
            if (score > current) {  // current = max(current, score)
                current = score;
                if (depth === this.maxDepth) { // root
                    this.bestMove = move.clone();
                }
                if (score > alpha) {
                    alpha = score;
                    entryType = ENTRYTYPE.Exact;
                }
                if (alpha >= beta) {
                    entryType = ENTRYTYPE.LowerBound;
                    break; // beta pruning
                }
            }
        }
        this.TT.update(entryType, current, depth, isOwn);
        return current; // maximum
    }
}