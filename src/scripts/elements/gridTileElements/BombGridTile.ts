import * as PIXI from "pixi.js";
import BaseGridTile from "./BaseGridTile";
import config from "../../config/config.json";
import SapperGameModel from "../../saperGame/models/SapperGameModel";

export default class BombGridTile extends BaseGridTile {
    constructor(colNumber: int, rowNumber: int){
        super(PIXI.Texture.from(config.tilesTextures.bomb), colNumber, rowNumber);
    }

    onClick(){
        super.onClick();
        this.openTile();
    }

    openTile(){
        super.openTile();
        if (this.opened)
            SapperGameModel.instance.loseGame();
    }
}

