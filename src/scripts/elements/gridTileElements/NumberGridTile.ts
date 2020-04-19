import BaseGridTile from "./BaseGridTile";
import SapperGameController from "../../saperGame/conrollers/SapperGameController";
import LoaderManager from "../../managers/LoaderManager";

const textures = [
    "number_0",
    "number_1",
    "number_2",
    "number_3",
    "number_4",
    "number_5",
    "number_6",
    "number_7",
    "number_8"
];

export default class NumberGridTile extends BaseGridTile {
    get number(): int {
        return this._number;
    }

    private _number: int;

    constructor(number: int, colNumber: int, rowNumber: int) {
        //super(PIXI.Texture.from(LoaderManager.instance.getResourcesByName("number_"+ number)), colNumber, rowNumber);
        super(LoaderManager.instance.getResourcesByName(textures[number]).texture, colNumber, rowNumber);
        this._number = number;
    }

    onClick(): void {
        SapperGameController.instance.onTileClick(this);
        super.onClick();
    }
//
    shouldProvokeRecursive(): boolean {
        return this.number === 0 && !this.flaged;
    }

}