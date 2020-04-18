import BombGridTile from "./BombGridTile";
import NumberGridTile from "./NumberGridTile";
import {BOMB_VALUE} from "../../saperGame/models/SapperGameModel";

export default class GridTileFab {

    constructor() {
    }

    public getTileByType(type: any, rowNumber: int, colNumber: int) {

        if (type === BOMB_VALUE) {
            return new BombGridTile(rowNumber, colNumber);
        } else {
            return new NumberGridTile(type, rowNumber, colNumber);
        }
    }
}