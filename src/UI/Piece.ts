import Point from '../common/Point';
import Move from '../common/Move';
import Rect from '../common/Rect';
import Widget from './common/Widget';
import Layout from './setting/Layout';
import PieceStyle from './setting/PieceStyle';
import { PLAYER, PIECE } from '../common/define';
import Rule from '../common/Rule';
import BoardBase from './BoardBase';

export default class Piece extends Widget {
    private name: string; // a Chinese character
    private owner: PLAYER; // 
    private type: PIECE;
    private position: Point;

    private layout: Layout; // board layout, for putting chess in proper position
    private style: PieceStyle;

    private isDragging: boolean;

    private targetIndicator: Point | null; // indicator
    private targetIndicatorAlpha: number;

    protected parent!: BoardBase;

    constructor(parent: Widget, name: string, owner: PLAYER, type: PIECE, position: Point, layout: Layout, style: PieceStyle) {
        super(parent, null);
        this.name = name;
        this.type = type;
        this.owner = owner;
        this.position = position;

        this.isDragging = false;

        this.targetIndicator = null;
        this.targetIndicatorAlpha = 0.2;

        this.layout = layout;
        this.style = style;
        let left = layout.padding + layout.cell * this.position.x - layout.cell / 2;
        let top = layout.padding + layout.cell * this.position.y - layout.cell / 2;
        this.offsetRect = new Rect( left, top, left + layout.cell, top + layout.cell);
    }
    protected onPaint() {
        let layout = this.layout;
        let style = this.style;
        let ctx = this.canvas.getContext('2d');
        if (ctx == null) throw Error("Context type undefined!");
        ctx.fillStyle = style.background;
        ctx.strokeStyle = style.border;
        ctx.font = style.font;
        // center
        let x = this.offsetRect.left + layout.cell / 2,
            y = this.offsetRect.top + layout.cell / 2;
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        // shadow
        if (this.isDragging) ctx.arc(x + 2, y + 4, layout.chessRadius + 1, 0, 360);
        else ctx.arc(x + 1, y + 2, layout.chessRadius + 1, 0, 360);
        ctx.fill();
        ctx.fillStyle = style.background;
        ctx.closePath();
        // indicator
        if (this.targetIndicator != null && this.targetIndicatorAlpha > 0) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 128, 0, " + this.targetIndicatorAlpha + ")";
            ctx.arc(layout.padding + this.targetIndicator.x * layout.cell, layout.padding + this.targetIndicator.y * layout.cell, layout.cell / 2, 0, 360);
            ctx.fill();
            ctx.fillStyle = style.background;
            ctx.closePath();
        }
        // piece body
        ctx.beginPath();
        ctx.arc(x, y, layout.chessRadius, 0, 360);
        ctx.fill();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = style.font;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(this.name, x + 1, y - layout.fontSize / 16 + 1);
        ctx.fillStyle = style.fontColor;
        ctx.fillText(this.name, x, y - layout.fontSize / 16);
        ctx.stroke();
        ctx.closePath();
    }
    onMouseDown() {
        if (this.parent.lock) return;
        if (!this.parent.isThreadCompleted) return; // blocked by other action
        if (this.parent.currentMover == this.owner) {
            this.isDragging = true; // block other action
            this.parent.moveChildToTop(this); // move piece to front
            this.parent.redraw(); // repaint
        }
    }
    onMouseMove(point) {
        let layout = this.layout;
        if (this.isDragging) {
            if (point.x <= 0 || point.x >= layout.offsetWidth || point.y <= 0 || point.y >= layout.offsetHeight) {
                this.isDragging = false; // if outside board, stop it
                this.moveTo(this.position); // cancle current move
                this.parent.redraw();
                return;
            }
            // left top
            let x = point.x - layout.cell / 2,
                y = point.y - layout.cell / 2;
            // move
            this.offsetRect.moveTo(x, y);
            // position on board (file, rank)
            let pos = this.point2chessPos(x, y);
            // test rules
            if (this.parent.isLegalMove(this.position, pos)) this.targetIndicator = pos;
            else this.targetIndicator = null;
            // repaint
            this.parent.redraw();
        }
    }
    onMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            if (this.targetIndicator === null) {
                this.moveTo(this.position); // cancle current move
                this.parent.redraw();
                return;
            }
            let pos = this.targetIndicator;
            this.parent.update(new Move(this.position, pos)); // notice Board to update
        }
    }
    public move(pos: Point): void {
        this.targetIndicator = pos;
        this.moveTo(pos);
    }
    public isAt(pos: Point): boolean {
        return pos!=null && this.position.equals(pos);
    }
    // canvas coordinate to board (file,rank)
    private point2chessPos(x: number, y: number): Point {
        let layout = this.layout;
        return new Point(Math.ceil((x - layout.padding) / layout.cell), Math.ceil((y - layout.padding) / layout.cell));
    }
    private chessPos2point(x: number, y: number): Point {
        let layout = this.layout;
        return new Point(x * layout.cell + layout.padding, y * layout.cell + layout.padding);
    }
    // move a piece
    private moveTo(pos: Point): void {
        this.parent.isThreadCompleted = false; // lock mutex
        let layout=this.layout;
        // target
        let left = layout.padding + layout.cell * pos.x - layout.cell / 2,
            top = layout.padding + layout.cell * pos.y - layout.cell / 2;
        // offset
        let dx = left - this.offsetRect.left,
            dy = top - this.offsetRect.top;
        // animation
        let t = 0, // time counter, unit: frame
            c = 15, //15 frame, 1 frame = 40ms
            piece = this;
        let timer = setInterval(()=> {
            if (++t > c) { // finish
                clearInterval(timer);
                piece.position = pos;
                piece.offsetRect.moveTo(left, top);
                piece.targetIndicator = null;
                piece.targetIndicatorAlpha = 0.2;
                piece.parent.isThreadCompleted = true; // release mutex
                return;
            }
            // t=0，ratio=1; t=c, ratio=0
            let ratio = 0;
            if (t <= c / 2) { // 
                ratio = 2 * t / c; // 
                ratio = 1 - 0.5 * ratio * ratio * ratio * ratio;
            } else {
                ratio = 2 - 2 * t / c;
                ratio = 0.5 * ratio * ratio * ratio * ratio;
            }
            piece.offsetRect.moveTo(left - dx * ratio, top - dy * ratio);
            piece.targetIndicatorAlpha = 0.2 * ratio;
            piece.parent.redraw();
        }, 40);
        // update position
        this.position = pos;
    }
}
