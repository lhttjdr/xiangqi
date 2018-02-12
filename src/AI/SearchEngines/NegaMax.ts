import SearchEngine from '../SearchEngine';
import Board from '../../common/Board';
import Move from '../../common/Move';

// Negamax search is a variant form of minimax search that relies on the zero-sum property of a two-player game.
// Knuth and Moore, 1975
export default class NegaMax extends SearchEngine {
    constructor() {
        super();
    };
    searchAGoodMove(board: Board, timeLimit: number): Move | null {
        let timeCount = (new Date()).getTime();
        this.searchNodes = 0;
        this.bestMove = null;
        this.currentBoard = board.clone();
        let score = this.negamax(this.maxDepth);
        this.setStatus(score);

        console.log(this.currentBoard.toString());
        console.log("score:"+score);
        console.log("time:"+(new Date().getTime() - timeCount).toString() + "ms");
        console.log("node:" + this.searchNodes);
        console.log("time limit:" + timeLimit + "ms");

        return this.bestMove;
    }
    private negamax(depth) {
        this.searchNodes += 1;
        let score = this.quickEvaluate(this.maxDepth - depth); // quick evaluation
        if (score != 0) return score; // terminal node
        if (depth === 0) // Leaf
            return this.evaluator.evaluate(this.currentBoard);
        let possible = this.generator.getPossibleMoves(this.currentBoard);
        if (possible.length == 0) { // terminal node
            return this.stalemate(this.maxDepth - depth);
        }

        let currentBest: number = this.evaluator.lost(this.maxDepth - depth); // -inf
        for (let move of possible) {
            this.doMove(move);
            score = -this.negamax(depth - 1);
            this.undoMove();
            if (currentBest <= score) {
                currentBest = score;
                if (depth === this.maxDepth) { // root
                    this.bestMove = move.clone();
                }
            }
        }
        return currentBest;
    }
};