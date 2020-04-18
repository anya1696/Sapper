import * as PIXI from "pixi.js";
import BaseGridTile from "./BaseGridTile";
import config from "../../config/config.json";
import SapperGameModel from "../../saperGame/models/SapperGameModel";

const textures = [
    config.tilesTextures.number_0,
    config.tilesTextures.number_1,
    config.tilesTextures.number_2,
    config.tilesTextures.number_3,
    config.tilesTextures.number_4,
    config.tilesTextures.number_5,
    config.tilesTextures.number_6,
    config.tilesTextures.number_7,
    config.tilesTextures.number_8
];

export default class NumberGridTile extends BaseGridTile {
    get number(): int {
        return this._number;
    }

    private _number: int;

    constructor(number: int, colNumber: int, rowNumber: int) {
        super(PIXI.Texture.from(textures[number]), colNumber, rowNumber);
        this._number = number;
    }

    onClick(): void {
        SapperGameModel.instance.openViewTile(this);
        super.onClick();
    }

    shouldProvokeRecursive(): boolean {
        return this.number === 0 && !this.flaged;
    }

}