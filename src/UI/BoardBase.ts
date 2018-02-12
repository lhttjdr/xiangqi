import View from './common/View';
import Point from '../common/Point';
import Move from '../common/Move';
import { PLAYER, PIECE, opponent } from '../common/define';
import ManagerBase from '../ManagerBase';
import Layout from './setting/Layout';
import BoardStyle from './setting/BoardStyle';
import Record from './Record';

export default abstract class BoardBase extends View {
    protected human: PLAYER;
    protected computer: PLAYER;

    // JavaScript is single-threaded
    // AI computation should not block UI thread
    // Mouse event, paint event, animation event should block each other
    public isThreadCompleted: boolean; // mutex

    public lock: boolean; // lock board when game over, block all mouse event

    protected mover: PLAYER;

    protected messager: ManagerBase | null = null;

    protected history: Array<Record>;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.human = PLAYER.Red;
        this.computer = PLAYER.Black;

        this.mover = PLAYER.Red;

        this.isThreadCompleted = true;
        this.lock = false;

        this.history = [];
    }
    get currentMover(): PLAYER {
        return this.mover;
    }
    public isLegalMove(from: Point, to: Point): boolean {
        return this.messager!.isLegalMove(new Move(from.clone(), to.clone()));
    }
    public isCompuer(): boolean {
        return this.mover === this.computer;
    }
    protected switchMover() {
        this.mover = opponent(this.mover);
    }
    public setMessager(messager: ManagerBase) {
        this.messager = messager;
    }
    // flow: manager (AI, search finished) -> board -> piece & manager
    // flow: piece (user, mouse up) -> board -> piece & manager
    abstract update(move: Move): void;
}
