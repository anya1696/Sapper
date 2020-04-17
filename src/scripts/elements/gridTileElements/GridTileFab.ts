import BombGridTile from "./BombGridTile";
import NumberGridTile from "./NumberGridTile";

const BOMB_VALUE = -1;

// const GRID_TILE_TYPES = {
//     number_0: "number_0",
//     number_1: "number_1",
//     number_2: "number_2",
//     number_3: "number_3",
//     number_4: "number_4",
//     number_5: "number_5",
//     number_6: "number_6",
//     number_7: "number_7",
//     number_8: "number_8",
//     bomb: "bomb",
//
//     close: "close",
//     flag: "flag",
//     question: "question"
// };

export default class GridTileFab {

    constructor(){
    }

    public getTileByType(type:any, rowNumber: int, colNumber: int){

        if (type === BOMB_VALUE){
            return new BombGridTile(rowNumber, colNumber);
        }else {
            return new NumberGridTile(type, rowNumber, colNumber);
        }
    }
}