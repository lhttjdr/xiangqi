import Board from '../common/Board';
import { STATUS } from "../common/define";

// score
// -(threshold+maxSearchDepth), already lost
// ...,
// -(threshold+1), lost after n-1 steps
// -threshold, lost after n steps
// -(threshold-1), almost lost
// ...
// 0,
// ...
// threshold-1, almost win
// threshold, win after n steps
// threshold+1, win after n-1 steps
// ...
// threshold+maxSearchDepth, already win

export default abstract class Evaluator {
    public abstract evaluate(board: Board): number;
    protected threshold: number = 0;
    protected maxSearchDepth: number = 0;
    get WIN(): number {
        return this.threshold + this.maxSearchDepth;
    }
    get LOST(): number {
        return -(this.threshold + this.maxSearchDepth);
    }
    win(step: number): number {
        return this.threshold + this.maxSearchDepth - step;
    }
    lost(step: number): number {
        return -(this.threshold + this.maxSearchDepth - step);
    }
    isWin(score: number, step:number): boolean {
        return score >= this.threshold + this.maxSearchDepth - step;
    }
    isLost(score: number, step:number): boolean {
        return score <= -(this.threshold + this.maxSearchDepth - step);
    }
}

