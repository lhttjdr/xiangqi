import { PLAYER, PIECE, SIZE, STATUS } from './common/define';
import Point from './common/Point';
import Move from './common/Move';
import Board from './common/Board';
import Piece from './common/Piece';
import Rule from './common/Rule';
import ManagerBase from './ManagerBase';
import BoardUI from './UI/Board';
import PieceUI from './UI/Piece';
import SearchEngine from './AI/SearchEngine';
import { MESSAGE } from './Message';
import Setting from './Setting';

import MiniMax from './AI/SearchEngines/MiniMax';
import NegaMax from './AI/SearchEngines/NegaMax';
import AlphaBetaMiniMax from './AI/SearchEngines/AlphaBetaMiniMax';
import Aspiration from './AI/SearchEngines/Aspiration';
import IterativeDeepeningNegaScout_TT_HH from './AI/SearchEngines/IterativeDeepeningNegaScout_TT_HH';
import IterativeDeepeningAlphaBeta from './AI/SearchEngines/IterativeDeepeningAlphaBeta';
import IterativeDeepeningPVS from './AI/SearchEngines/IterativeDeepeningPVS';
import PrincipalVariationSearch from './AI/SearchEngines/PVS';
import NegaScout_TT_HH from './AI/SearchEngines/NegaScout_TT_HH';
import MTDf from './AI/SearchEngines/MTDf';

import Evaluator from './AI/Evaluator';
import SimpleEvaluator from './AI/Evaluators/SimpleEvaluator';
import MoveGenerator from './AI/MoveGenerator';
import SimpleMoveGenerator from './AI/MoveGenerators/SimpleMoveGenerator';
import Notation from './common/Notation';

export default class Manager extends ManagerBase {
    // manage communication among these 3 parts
    private board: Board;
    private UI: BoardUI;
    private AI: SearchEngine;

    private gameOver: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        super();
        // data model
        this.board = new Board();
        Manager.initialize(this.board);
        // UI
        this.UI = new BoardUI(canvas, Setting.layout, Setting.style.board);
        this.UI.set(this.board, Setting.style.piece);
        this.UI.show();

        // prepare AI
        this.AI = new IterativeDeepeningNegaScout_TT_HH();
        // this.AI.setSearchDepth(3);
        this.AI.setMoveGenerator(new SimpleMoveGenerator());
        this.AI.setEvaluator(new SimpleEvaluator());
    }
    public bind() {
        this.UI.setMessager(this);
    }
    public doMove(move: Move): void {
        if (move.from.equals(move.to)) return;
        console.log(Notation.notatioin(move, this.board));
        this.board.doMove(move);
        this.judge();
        if (!this.gameOver && this.UI.isCompuer()) {
            this.search(); // start AI search
        }
    }
    private undoMove(): void {
        console.log("undo");
        this.board.undoMove();
        this.UI.undo();
    }
    // when user click undo botton
    public userUndo(): void {
        if (this.gameOver && this.UI.isCompuer()) { // case 1: computer resign
            this.undoMove();
            this.unlock();
        } else { // case 2: ended after computer move
            if (this.UI.isCompuer()) return;
            if (this.gameOver) this.unlock();
            this.undoMove(); // undo computer move
            let manager = this;
            let timer = setInterval(function () {
                if (!manager.UI.isThreadCompleted) return;
                clearInterval(timer);
                manager.undoMove(); // undo user move
            }, 100);
        }
    }
    public destory() {
        this.UI.destory();
    }
    public isLegalMove(move: Move): boolean {
        return Rule.isLegalMove(move, this.board);
    }
    public isValidPosition(pos: Point): boolean {
        return !Rule.isOutsideBoard(pos);
    }
    private judge() { // judgement
        let status = this.board.quickTestStatus();
        switch (status) {
            case STATUS.Win:
                if (this.UI.isCompuer()) {
                    this.showMessage(MESSAGE.LOST);
                } else {
                    this.showMessage(MESSAGE.WIN);
                }
                break;
            case STATUS.Lost:
                if (this.UI.isCompuer()) {
                    this.showMessage(MESSAGE.WIN);
                } else {
                    this.showMessage(MESSAGE.LOST);
                }
                break;
            case STATUS.Draw:
                this.showMessage(MESSAGE.DRAW);
                break;
        }
        if (status != STATUS.NotEnded) this.lock();
    }
    private search() {
        let manager = this;
        // wait for UI thread complete
        let timer = setInterval(function () {
            if (!manager.UI.isThreadCompleted) return;
            clearInterval(timer);
            let best = manager.AI.searchAGoodMove(manager.board, 10000);
            if (best == null || manager.AI.STATUS != STATUS.NotEnded) {
                manager.lock();
                if (manager.AI.STATUS == STATUS.Win) {
                    manager.showMessage(MESSAGE.LOST); // user lost
                } else {
                    manager.showMessage(MESSAGE.RESIGN); // user win
                }
                return;
            }
            manager.UI.update(best);
        }, 100);
    }
    private lock() {
        this.gameOver = true;
        this.UI.lock = true;
    }
    private unlock() {
        this.gameOver = false;
        this.UI.lock = false;
    }
    private showMessage(msg: string): void{
        let manager = this;
        let timer = setInterval(function () {
            if (!manager.UI.isThreadCompleted) return;
            clearInterval(timer);
            alert(msg);
        }, 100);
    }
    private static initialize(board: Board):void {
        // init board data model
        board.set(new Point(4, 0), new Piece(board.upSidePlayer, PIECE.King));
        board.set(new Point(3, 0), new Piece(board.upSidePlayer, PIECE.Guard));
        board.set(new Point(5, 0), new Piece(board.upSidePlayer, PIECE.Guard));
        board.set(new Point(2, 0), new Piece(board.upSidePlayer, PIECE.Bishop));
        board.set(new Point(6, 0), new Piece(board.upSidePlayer, PIECE.Bishop));
        board.set(new Point(1, 0), new Piece(board.upSidePlayer, PIECE.Knight));
        board.set(new Point(7, 0), new Piece(board.upSidePlayer, PIECE.Knight));
        board.set(new Point(0, 0), new Piece(board.upSidePlayer, PIECE.Rook));
        board.set(new Point(8, 0), new Piece(board.upSidePlayer, PIECE.Rook));
        board.set(new Point(1, 2), new Piece(board.upSidePlayer, PIECE.Cannon));
        board.set(new Point(7, 2), new Piece(board.upSidePlayer, PIECE.Cannon));
        board.set(new Point(0, 3), new Piece(board.upSidePlayer, PIECE.Pawn));
        board.set(new Point(2, 3), new Piece(board.upSidePlayer, PIECE.Pawn));
        board.set(new Point(4, 3), new Piece(board.upSidePlayer, PIECE.Pawn));
        board.set(new Point(6, 3), new Piece(board.upSidePlayer, PIECE.Pawn));
        board.set(new Point(8, 3), new Piece(board.upSidePlayer, PIECE.Pawn));

        board.set(new Point(4, 9), new Piece(board.blewSidePlayer, PIECE.King));
        board.set(new Point(3, 9), new Piece(board.blewSidePlayer, PIECE.Guard));
        board.set(new Point(5, 9), new Piece(board.blewSidePlayer, PIECE.Guard));
        board.set(new Point(2, 9), new Piece(board.blewSidePlayer, PIECE.Bishop));
        board.set(new Point(6, 9), new Piece(board.blewSidePlayer, PIECE.Bishop));
        board.set(new Point(1, 9), new Piece(board.blewSidePlayer, PIECE.Knight));
        board.set(new Point(7, 9), new Piece(board.blewSidePlayer, PIECE.Knight));
        board.set(new Point(0, 9), new Piece(board.blewSidePlayer, PIECE.Rook));
        board.set(new Point(8, 9), new Piece(board.blewSidePlayer, PIECE.Rook));
        board.set(new Point(1, 7), new Piece(board.blewSidePlayer, PIECE.Cannon));
        board.set(new Point(7, 7), new Piece(board.blewSidePlayer, PIECE.Cannon));
        board.set(new Point(0, 6), new Piece(board.blewSidePlayer, PIECE.Pawn));
        board.set(new Point(2, 6), new Piece(board.blewSidePlayer, PIECE.Pawn));
        board.set(new Point(4, 6), new Piece(board.blewSidePlayer, PIECE.Pawn));
        board.set(new Point(6, 6), new Piece(board.blewSidePlayer, PIECE.Pawn));
        board.set(new Point(8, 6), new Piece(board.blewSidePlayer, PIECE.Pawn));
    }
}
