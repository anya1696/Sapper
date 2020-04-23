import * as PIXI from "pixi.js";
import BaseGridTile from "./BaseGridTile";
import config from "../../../config/config.json";
import SapperGameController from "../../controller/SapperGameController";

export default class BombGridTile extends BaseGridTile {
    constructor(colNumber: number, rowNumber: number) {
        super(PIXI.Texture.from(config.tilesTextures.bomb), colNumber, rowNumber);
    }

    /**
     * Поведение при клике (открытие тайла)
     */
    onClick(): void {
        super.onClick();
        this.openTile();
    }

    /**
     * Открыть тайл (провокация поражения)
     */
    openTile(): void {
        super.openTile();
        if (this.isOpen())
            SapperGameController.instance.loseGame();
    }
}

