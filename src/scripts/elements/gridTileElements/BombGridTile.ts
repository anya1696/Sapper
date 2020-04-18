import * as PIXI from "pixi.js";
import BaseGridTile from "./BaseGridTile";
import config from "../../config/config.json";
import SapperGameController from "../../saperGame/conrollers/SapperGameController";

export default class BombGridTile extends BaseGridTile {
    constructor(colNumber: int, rowNumber: int) {
        super(PIXI.Texture.from(config.tilesTextures.bomb), colNumber, rowNumber);
    }

    onClick(): void {
        super.onClick();
        this.openTile();
    }

    openTile(): void {
        super.openTile();
        if (this.opened)
            SapperGameController.instance.loseGame();
    }
}

