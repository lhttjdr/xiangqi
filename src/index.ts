import Manager from './Manager';

export default class Xiangqi {
    private canvas: HTMLCanvasElement;
    private manager: Manager;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.manager = new Manager(canvas);
        this.manager.bind();
    }
    public newGame() {
        if (this.manager != null) this.manager.destory();
        this.manager = new Manager(this.canvas);
        this.manager.bind();
    }
    public undoMove() {
        this.manager.userUndo();
    }
}