import BaseGridTile from "./BaseGridTile";
import SapperGameController from "../../conrollers/SapperGameController";
import LoadManager from "../../managers/LoadManager";

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
    get number(): number {
        return this._number;
    }

    private _number: number;

    constructor(number: number, colNumber: number, rowNumber: number) {
        super(LoadManager.instance.getResourcesByName(textures[number]).texture, colNumber, rowNumber);
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