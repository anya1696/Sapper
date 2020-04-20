import * as PIXI from "pixi.js";
import BaseGridTile from "./BaseGridTile";
import config from "../../../config/config.json";
import SapperGameController from "../../conrollers/SapperGameController";

export default class BombGridTile extends BaseGridTile {
    constructor(colNumber: number, rowNumber: number) {
        super(PIXI.Texture.from(config.tilesTextures.bomb), colNumber, rowNumber);
    }

    onClick(): void {
        super.onClick();
        this.openTile();
    }

    openTile(): void {
        super.openTile();
        if (this.fsm.is("opened"))
            SapperGameController.instance.loseGame();
    }
}

