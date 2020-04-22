import BaseGridTile from "./BaseGridTile";
import SapperGameController from "../../conroller/SapperGameController";
import ResourcesManager from "../managers/ResourcesManager";

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
        super(ResourcesManager.instance.getTextureByName(textures[number]), colNumber, rowNumber);
        this._number = number;
    }

    onClick(): void {
        SapperGameController.instance.onTileClick(this);
        super.onClick();
    }

    shouldProvokeRecursive(): boolean {
        return this.number === 0 && !this.fsm.is("flagged");
    }

}