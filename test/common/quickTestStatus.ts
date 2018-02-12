import Board from '../../src/common/Board';
import Point from '../../src/common/Point';
import Piece from '../../src/common/Piece';
import { STATUS, PIECE, PLAYER } from '../../src/common/define';
import { expect } from 'chai';
import 'mocha';

describe('Fly Check test', () => {
    it('It should be fly check state.', () => {
        let board = new Board();
        board.set(new Point(4, 0), new Piece(PLAYER.Black, PIECE.King));
        board.set(new Point(4, 9), new Piece(PLAYER.Red, PIECE.King));
        expect(board.quickTestStatus()).to.equal(STATUS.FlyCheck);
    });
    it('It should not be fly check state.', () => {
        let board = new Board();
        board.set(new Point(5, 0), new Piece(PLAYER.Black, PIECE.King));
        board.set(new Point(4, 9), new Piece(PLAYER.Red, PIECE.King));
        expect(board.quickTestStatus()).not.to.equal(STATUS.FlyCheck);
    });
    it('It should not be fly check state.', () => {
        let board = new Board();
        board.set(new Point(4, 0), new Piece(PLAYER.Black, PIECE.King));
        board.set(new Point(4, 1), new Piece(PLAYER.Black, PIECE.Guard));
        board.set(new Point(4, 9), new Piece(PLAYER.Red, PIECE.King));
        expect(board.quickTestStatus()).not.to.equal(STATUS.FlyCheck);
    });
});