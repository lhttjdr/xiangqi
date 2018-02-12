import Board from '../../src/common/Board';
import Point from '../../src/common/Point';
import Piece from '../../src/common/Piece';
import Move from '../../src/common/Move';
import { STATUS, PIECE, PLAYER } from '../../src/common/define';
import { expect } from 'chai';
import 'mocha';

describe('deep copy test', () => {
    it('Copied Point should be independent from the original.', () => {
        let a = new Point(2, 3);
        let b = a.clone();
        expect(a.equals(b)).to.be.true;
        b.moveTo(3, 4);
        expect(a.equals(b)).to.be.false;
    });
    it('Copied Piece should be independent from the original.', () => {
        let a = new Piece(PLAYER.Red, PIECE.Cannon);
        let b = a.clone();
        expect(a.owner).to.equals(b.owner);
        expect(a.type).to.equals(b.type);
        b.owner = PLAYER.Black;
        expect(a.owner).not.to.equals(b.owner);
    });
    it('Copied Move should be independent from the original.', () => {
        let a = new Move(new Point(2, 3), new Point(4, 5));
        a.attack(PIECE.Cannon);
        a.guard(PIECE.Guard);
        let b = a.clone();
        expect(a.from.equals(b.from)).to.be.true;
        expect(a.to.equals(b.to)).to.be.true;
        expect(a.target).to.equals(b.target);
        expect(a.protege).to.equals(b.protege);
        b.from.moveTo(1, 2);
        expect(a.from.equals(b.from)).to.be.false;
        b.to.moveTo(7, 8);
        expect(a.to.equals(b.to)).to.be.false;
        b.attack(PIECE.Rook);
        expect(a.target).not.to.equals(b.target);
        b.guard(PIECE.Knight);
        expect(a.protege).not.to.equals(b.protege);
    });
});