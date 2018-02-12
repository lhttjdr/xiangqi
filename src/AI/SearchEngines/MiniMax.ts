import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

// The first theorem in this sense is von Neumann's minimax theorem from 1928, 
// which was considered the starting point of game theory.
export default class MiniMax extends SearchEngine {
    constructor() {
        super();
    };
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        let timeCount = (new Date()).getTime();
        this.searchNodes = 0;
        this.bestMove = null;
        this.currentBoard = board.clone();
        let score = this.minimax(this.maxDepth);
        this.setStatus(score);

        console.log(this.currentBoard.toString());
        console.log("score:" + score);
        console.log("time:" + (new Date().getTime() - timeCount).toString() + "ms");
        console.log("node:" + this.searchNodes);
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private minimax(depth: number) { // depth: depth to search
        this.searchNodes += 1;
        let layer = this.maxDepth - depth; // distance from root
        let isMaxLayer = (layer % 2 == 0); // even: find max; odd: find min
        let score = this.quickEvaluate(layer); // quick evaluation
        if (score != 0) return isMaxLayer ? score : -score; // // terminal node
        if (depth == 0 ) { // Leaf
            score = this.evaluator.evaluate(this.currentBoard);
            return isMaxLayer ? score : -score;
        }
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(layer);
        }

        let currentBest = isMaxLayer ? this.evaluator.lost(layer) : this.evaluator.win(layer); // -inf, +inf
        for (let move of possible) {
            this.doMove(move);
            score = this.minimax(depth - 1);
            this.undoMove();
            if (isMaxLayer) { // max
                if (currentBest <= score) {
                    currentBest = score;
                    if (depth === this.maxDepth) { // root
                        this.bestMove = move.clone();
                    }
                }
            } else { // min
                if (currentBest >= score) {
                    currentBest = score;
                }
            }
        }
        return currentBest;
    }
};