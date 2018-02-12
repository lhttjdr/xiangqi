import { SIZE, PLAYER, pos2idx } from '../common/define';
import Move from '../common/Move';

// The History Heuristic and Alpha - Beta Search Enhancements in Practice, Jonathan Schaeffer, 1989

export default class HistoryHeuristic {
    private historyTable: Array<Array<number>>;
    private targetBuff: Array<number>;
    constructor(){
        // 90 * 90 matrix with 0
        this.historyTable = Array.apply(null, Array(SIZE.files * SIZE.ranks)).map(() =>
            Array.apply(null, Array(SIZE.files * SIZE.ranks)).map(() => 0)
        );
        this.targetBuff=new Array();
    }
    clear() {
        this.historyTable.map((row) => row.map(() => 0));
    }
    get(move:Move):number{
        let from = pos2idx(move.from.x, move.from.y),
            to = pos2idx(move.to.x, move.to.y);
        return this.historyTable[from][to];
    }
    update(move: Move, depth: number): void{
        let from = pos2idx(move.from.x, move.from.y),
            to = pos2idx(move.to.x, move.to.y);
        this.historyTable[from][to] += 2 << depth; // a value recommand by Schaeffer
    }
};
