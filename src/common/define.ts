// two players
export enum PLAYER {
    Red,
    Black
};
export const opponent = function (self: PLAYER): PLAYER {
    return self == PLAYER.Black ? PLAYER.Red : PLAYER.Black;
}
// 7 types of pieces
export enum PIECE {
    King,
    Guard,
    Bishop,
    Knight,
    Rook,
    Cannon,
    Pawn
};

export const character = function (type: PIECE, owner: PLAYER): string {
    switch (type) {
        case PIECE.King: return owner == PLAYER.Red ? "帥" : "將";
        case PIECE.Guard: return owner === PLAYER.Red ? "仕" : "士";
        case PIECE.Bishop: return owner == PLAYER.Red ? "相" : "象";
        case PIECE.Knight: return owner == PLAYER.Red ? "傌" : "馬";
        case PIECE.Rook: return owner === PLAYER.Red ? "俥" : "車";
        case PIECE.Cannon: return owner == PLAYER.Red ? "炮" : "砲";
        case PIECE.Pawn: return owner === PLAYER.Red ? "兵" : "卒";
    }
}

// board size 9*10
export class SIZE {
    public static readonly files = 9;
    public static readonly ranks = 10;
};

export const pos2idx = function (x: number, y: number): number {
    return y * SIZE.files + x;
}

export enum STATUS {
    NotEnded,
    Win,
    Lost,
    Draw,
    FlyCheck,
    Stalemate,
    Impossbile
}