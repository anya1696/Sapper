import * as PIXI from "pixi.js";
import config from "../../config/config.json";

import SapperGameModel from "../../saperGame/models/SapperGameModel";
import IViewTile from "../../interfaces/IViewTile";

export default abstract class BaseGridTile extends PIXI.Container implements IViewTile {
    get colNumber(): int {
        return this._colNumber;
    }

    get rowNumber(): int {
        return this._rowNumber;
    }

    closeTexture: PIXI.Texture;
    flagTexture: PIXI.Texture;
    questionTexture: PIXI.Texture;

    openTexture: PIXI.Texture;

    flaged: boolean;
    opened: boolean;
    closed: boolean;
    questioned: boolean;

    private stateView: PIXI.Sprite;
    private _rowNumber: int;
    private _colNumber: int;

    constructor(texture: PIXI.Texture, colNumber: int, rowNumber: int) {
        super();

        this.openTexture = texture;

        this.closeTexture = PIXI.Texture.from(config.tilesTextures.close);
        this.flagTexture = PIXI.Texture.from(config.tilesTextures.flag);
        this.questionTexture = PIXI.Texture.from(config.tilesTextures.question);

        this.stateView = PIXI.Sprite.from(this.openTexture);
        this.stateView.height = config.tilesParams.tileHeight;
        this.stateView.width = config.tilesParams.tileWidth;

        this._colNumber = colNumber;
        this._rowNumber = rowNumber;

        this.flaged = false;
        this.opened = false;
        this.closed = true;
        this.questioned = false;

        this.setCloseState();

        SapperGameModel.instance.registerTile(this);
        this.on('click', this.onClick);
        this.on('rightclick', this.onRightClick);

        this.interactive = true;
        this.buttonMode = true;

        this.addChild(this.stateView);

    }

    setCloseState(): void {
        this.stateView.texture = this.closeTexture;

        this.flaged = false;
        this.opened = false;
        this.closed = true;
        this.questioned = false;
    }

    setFlagState(): void {
        if (!(this.closed || !this.questioned)) {
            return;
        }
        this.stateView.texture = this.flagTexture;
        this.flaged = true;
        this.opened = false;
        this.closed = false;
        this.questioned = false;
        SapperGameModel.instance.incFlagedAmount();
    }

    setQuestionState(): void {
        if (!this.flaged) {
            return;
        }
        SapperGameModel.instance.decFlagedAmount();
        this.stateView.texture = this.questionTexture;

        this.flaged = false;
        this.opened = false;
        this.closed = false;
        this.questioned = true;
    }

    setOpenState(): void {
        if (this.opened || this.flaged) {
            return;
        }
        this.stateView.texture = this.openTexture;

        this.flaged = false;
        this.opened = true;
        this.closed = false;
        this.questioned = false;
        SapperGameModel.instance.incOpenedAmount();
    }

    openTile(): void {
        this.setOpenState();
    }

    onClick(): void {

    }

    onRightClick(): void {
        if (this.closed) {
            this.setFlagState();
        } else if (this.flaged) {
            this.setQuestionState();
        } else if (this.questioned) {
            this.setCloseState();
        }
    }

    shouldProvokeRecursive(): boolean {
        return false;
    }

    getCol(): int {
        return this.colNumber;
    }

    getRow(): int {
        return this.rowNumber;
    }

    isOpen(): boolean {
        return this.opened;
    }
}