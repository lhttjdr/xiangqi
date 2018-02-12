import Board from '../common/Board';
import Move from '../common/Move';
import Evaluator from './Evaluator';
import MoveGenerator from './MoveGenerator';
import Rule from '../common/Rule';
import { STATUS } from '../common/define';

export default abstract class SearchEngine {
    protected currentBoard!: Board;
    protected evaluator!: Evaluator;
    protected generator!: MoveGenerator;

    protected maxDepth: number = 3;
    protected bestMove: Move | null = null;
    protected status: STATUS = STATUS.NotEnded;
    protected resignStep: number = 1;
    protected winStep: number = 0;

    protected searchNodes: number = 0; // only for log

    constructor() {

    }
    public abstract searchAGoodMove(board: Board, timeLimit?: number): Move | null;
    public get STATUS(): STATUS{
        return this.status;
    }
    setSearchDepth(depth: number): void {
        this.maxDepth = depth;
    }
    setEvaluator(evaluator: Evaluator): void {
        this.evaluator = evaluator;
    }
    setMoveGenerator(generator: MoveGenerator): void {
        this.generator = generator;
    }
    protected doMove(move:Move): void {
        this.currentBoard.doMove(move);
    }
    protected undoMove(): void {
        this.currentBoard.undoMove();
    }
    protected quickEvaluate(depth: number): number {
        // depth = distance from root
        // depth=0, 2, 4, 6,...: self;
        // depth=1, 3, 5, 7,...: oppenent
        let status = this.currentBoard.quickTestStatus();
        switch (status) {
            case STATUS.Win:
                return this.evaluator.win(depth); // depth small first, win
            case STATUS.Lost:
                return this.evaluator.lost(depth); // lost
            case STATUS.FlyCheck:
                // Notice: If search engine can find out fly check as early as possible,
                // the fly check found must be caused by oppenent, because the fly check
                // by self should be tested in previous search.
                return this.evaluator.win(depth);
            case STATUS.Impossbile:
                throw new Error("Impossible!");
        }
        return 0; // STATUS.NotEnded
    }
    protected stalemate(step: number) {
        return this.evaluator.lost(step);
    }
    protected setStatus(score: number) {
        if (this.evaluator.isWin(score,this.winStep)) this.status = STATUS.Win;
        else if (this.evaluator.isLost(score,this.resignStep)) this.status = STATUS.Lost;
        else this.status = STATUS.NotEnded;
    }
}
