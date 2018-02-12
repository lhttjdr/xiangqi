import View from './common/View';
import Point from '../common/Point';
import Move from '../common/Move';
import { PLAYER, PIECE, SIZE, opponent, character } from '../common/define';
import ManagerBase from '../ManagerBase';
import Layout from './setting/Layout';
import BoardStyle from './setting/BoardStyle';
import PieceStyle from './setting/PieceStyle';
import BoardBase from './BoardBase';
import Piece from './Piece';
import Record from './Record';
import Notation from '../common/Notation';

import PieceData from '../common/Piece';
import BoardData from '../common/Board';

export default class Board extends BoardBase {
    private layout: Layout;
    private style: BoardStyle;

    protected children: Array<Piece> = [];

    constructor(canvas: HTMLCanvasElement, layout: Layout, style: BoardStyle) {
        super(canvas);

        this.offsetRect.left = 0;
        this.offsetRect.top = 0;
        this.offsetRect.right = 460;
        this.offsetRect.bottom = 510;

        this.layout = layout;
        this.style = style;
    }
    // find Piece widget on Board
    private findChess(pos: Point): Piece | null {
        if (!this.messager!.isValidPosition(pos)) return null;
        for (let child of this.children) {
            if (child.isAt(pos)) return child;
        }
        return null;
    }
    public undo(): void {
        let record = this.history.pop();
        if (typeof record !== "undefined") {
            let piece = this.findChess(record.to);
            if (piece == null) throw Error("Piece Not Found!");
            piece.move(record.from);
            // restore killed piece
            if (record.piece != null) {
                this.addChild(record.piece);
                record.piece.move(record.to); // just move inplace and trigger redraw
            }
            this.switchMover();
        }
    }
    // flow: manager (AI, search finished) -> board -> piece & manager
    // flow: piece (user, mouse up) -> board -> piece & manager
    update(move: Move): void {
        let piece = this.findChess(move.from);
        let killed = this.findChess(move.to);
        this.history.push(new Record(move, killed));
        this.removeChess(move.to); // update board
        if (piece == null) throw Error("Piece Not Found!");
        piece.move(move.to); // update piece position
        this.switchMover();
        this.messager!.doMove(move); // update board model
    }
    private removeChess(pos: Point): void {
        let piece = this.findChess(pos);
        if (piece != null) this.removeChild(piece);
    }
    onPaint() { 
        let ctx = this.canvas.getContext('2d');
        if (ctx == null) throw Error("Context Type Undefined!"); 
        let style = this.style;
        let layout = this.layout;
        // background
        ctx.fillStyle = style.background;
        ctx.beginPath();
        ctx.rect(0, 0, layout.offsetWidth, layout.offsetHeight);
        ctx.fill();
        ctx.closePath();
        // lines
        let p = layout.padding,
            s = layout.cell,
            w = layout.width,
            h = layout.height;
        ctx.strokeStyle = style.border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        // 10 ranks
        for (let i = 0; i < 10; i++) {
            ctx.moveTo(p, s * i + p);
            ctx.lineTo(w + p, s * i + p);
        }
        // left-most, right-most ranks
        ctx.moveTo(p, p);
        ctx.lineTo(p, h + p);
        ctx.moveTo(w + p, p);
        ctx.lineTo(w + p, h + p);
        // 7 ranks cross river
        for (let i = 1; i < 8; i++) {
            ctx.moveTo(s * i + p, p);
            ctx.lineTo(s * i + p, s * 4 + p);
            ctx.moveTo(s * i + p, s * 5 + p);
            ctx.lineTo(s * i + p, h + p);
        }
        // castle
        ctx.moveTo(s * 3 + p, p);
        ctx.lineTo(s * 5 + p, s * 2 + p);
        ctx.moveTo(s * 5 + p, 0 + p);
        ctx.lineTo(s * 3 + p, s * 2 + p);
        ctx.moveTo(s * 3 + p, s * 7 + p);
        ctx.lineTo(s * 5 + p, s * 9 + p);
        ctx.moveTo(s * 5 + p, s * 7 + p);
        ctx.lineTo(s * 3 + p, s * 9 + p);
        ctx.stroke();
        ctx.closePath();
        // river
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.font = style.font;
        ctx.fillStyle = style.border;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("楚", -(p + s * 4.5), (p + s * 1.5));
        ctx.fillText("河", -(p + s * 4.5), (p + s * 2.5));
        ctx.rotate(Math.PI);
        ctx.fillText("漢", (p + s * 4.5), -(p + s * 6.5));
        ctx.fillText("界", (p + s * 4.5), -(p + s * 5.5));
        ctx.restore();
    }
    set(board: BoardData, style: (owner:PLAYER)=>PieceStyle): void {
        let layout = this.layout;
        for (let x = 0; x < SIZE.files; ++x) {
            for (let y = 0; y < SIZE.ranks; ++y) {
                let pos = new Point(x, y);
                let piece = board.at(pos);
                if (piece != null) {
                    new Piece(this, character(piece.type, piece.owner), piece.owner, piece.type, pos, layout, style(piece.owner));
                }
            }
        }
    }
    destory() {
        this.onDestroy();
    }
}