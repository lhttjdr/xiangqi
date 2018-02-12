import { PLAYER, PIECE} from './define';

// data of piece
export default class Piece {
    owner: PLAYER;
    type: PIECE;
    constructor(owner: PLAYER, type: PIECE) {
        this.type = type;
        this.owner = owner;
    }
    equals(piece: Piece): boolean {
        return this.type === piece.type && this.owner === piece.owner;
    }
    isOwnedBy(owner: PLAYER): boolean {
        return this.owner === owner;
    }
    isSameOwnerWith(piece: Piece): boolean {
        return this.owner === piece.owner;
    }
    clone(): Piece {
        return new Piece(this.owner, this.type);
    }
}