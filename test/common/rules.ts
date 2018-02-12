import Board from '../../src/common/Board';
import Point from '../../src/common/Point';
import Piece from '../../src/common/Piece';
import Move from '../../src/common/Move';
import Rule from '../../src/common/Rule';
import { STATUS, PIECE, PLAYER } from '../../src/common/define';
import { expect } from 'chai';
import 'mocha';

describe('Piece Move Rule', () => {
    it('Test King', () => {
        let board = new Board();
        if (board.currentMover != PLAYER.Black) board.switchMover();
        board.set(new Point(4, 1), new Piece(PLAYER.Black, PIECE.King));
        board.set(new Point(4, 2), new Piece(PLAYER.Black, PIECE.Bishop));
        board.set(new Point(5, 1), new Piece(PLAYER.Red, PIECE.Pawn));
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, 2)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, 0)), board)).to.be.true;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, 1)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(3, 1)), board)).to.be.true;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(5, 1)), board)).to.be.true;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(5, 2)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(3, 2)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(2, 1)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(6, 2)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(5, 0)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(3, 0)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(3, 2)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, -1)), board)).to.be.false;
    });
    it('Test Guard', () => {
        let board = new Board();
        if (board.currentMover != PLAYER.Black) board.switchMover();
        board.set(new Point(4, 1), new Piece(PLAYER.Black, PIECE.Guard));
        board.set(new Point(3, 0), new Piece(PLAYER.Black, PIECE.King));
        board.set(new Point(5, 2), new Piece(PLAYER.Red, PIECE.Pawn));
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, 2)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, 0)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, 1)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(3, 1)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(5, 1)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(5, 2)), board)).to.be.true;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(3, 2)), board)).to.be.true;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(2, 1)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(6, 2)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(5, 0)), board)).to.be.true;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(3, 0)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(2, 0)), board)).to.be.false;
        expect(Rule.isLegalMove(new Move(new Point(4, 1), new Point(4, -1)), board)).to.be.false;
    });
    it('Test Bishop', () => {
    });
});