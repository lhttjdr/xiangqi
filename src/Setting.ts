import { PLAYER } from './common/define';
import Layout from './UI/setting/Layout';
import BoardStyle from './UI/setting/BoardStyle';
import PieceStyle from './UI/setting/PieceStyle';

export default class Setting {
    // position and size
    public static layout:Layout = new Layout(30,50,20,36,400,450,460,510);
    // color and font
    public static style = {
        board: new BoardStyle("#630", "#fed", "36px DFKai-SB, STKaiti"),
        piece: (owner: PLAYER): PieceStyle => {
            switch (owner) {
                case PLAYER.Red:
                    return new PieceStyle("#fa8", "#fc9", "36px DFKai-SB, STKaiti", "#c00");
                case PLAYER.Black:
                    return new PieceStyle("#fa8", "#fc9", "36px DFKai-SB, STKaiti", "#090");
            }
        }
    }
};