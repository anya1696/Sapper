import * as PIXI from "pixi.js";
import config from "../../../config/config.json";
import IViewTile from "../interfaces/IViewTile";
import SapperGameController from "../../conrollers/SapperGameController";
import BaseButton from "../elements/buttons/BaseButton";
import LoadManager from "../../managers/LoadManager";

export default abstract class BaseGridTile extends PIXI.Container implements IViewTile {
    TEXTURES = {
        close: "close",
        flag: "flag",
        question: "question"
    };

    private buttonCloseView: BaseButton;
    private buttonFlagView: BaseButton;
    private buttonQuestionView: BaseButton;

    get colNumber(): number {
        return this._colNumber;
    }

    get rowNumber(): number {
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

    private spriteView: PIXI.Sprite;
    private _rowNumber: number;
    private _colNumber: number;

    constructor(texture: PIXI.Texture, colNumber: number, rowNumber: number) {
        super();

        this.openTexture = texture;

        this.closeTexture = LoadManager.instance.getResourcesByName(this.TEXTURES.close).texture;
        this.flagTexture = LoadManager.instance.getResourcesByName(this.TEXTURES.flag).texture;
        this.questionTexture = LoadManager.instance.getResourcesByName(this.TEXTURES.question).texture;

        this.buttonCloseView = this.getButton(this.closeTexture);
        this.buttonFlagView = this.getButton(this.flagTexture);
        this.buttonQuestionView = this.getButton(this.questionTexture);

        this.spriteView = PIXI.Sprite.from(this.openTexture);
        this.spriteView.visible = false;
        this.spriteView.anchor.set(0.5, 0.5);

        this.spriteView.height = config.tilesParams.tileHeight;
        this.spriteView.width = config.tilesParams.tileWidth;

        this._colNumber = colNumber;
        this._rowNumber = rowNumber;

        this.flaged = false;
        this.opened = false;
        this.closed = true;
        this.questioned = false;

        this.setCloseState();

        SapperGameController.instance.registerTile(this);
        this.on('click', this.onClick);
        this.on('rightclick', this.onRightClick);

        this.interactive = true;

        this.addChild(this.spriteView);
    }

    setCloseState(): void {
        this.showButtonCloseView();

        this.flaged = false;
        this.opened = false;
        this.closed = true;
        this.questioned = false;
    }

    setFlagState(): void {
        if (!(this.closed || !this.questioned)) {
            return;
        }

        this.showButtonFlagView();

        this.spriteView.texture = this.flagTexture;
        this.flaged = true;
        this.opened = false;
        this.closed = false;
        this.questioned = false;
        SapperGameController.instance.incFlagedAmount();
    }

    setQuestionState(): void {
        if (!this.flaged) {
            return;
        }

        this.showButtonQuestionView();

        SapperGameController.instance.decFlagedAmount();
        this.spriteView.texture = this.questionTexture;

        this.flaged = false;
        this.opened = false;
        this.closed = false;
        this.questioned = true;
    }

    setOpenState(): void {
        if (this.opened || this.flaged) {
            return;
        }
        this.spriteView.texture = this.openTexture;
        this.showSpriteOpenView();

        this.flaged = false;
        this.opened = true;
        this.closed = false;
        this.questioned = false;
        SapperGameController.instance.incOpenedAmount();
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

    getCol(): number {
        return this.colNumber;
    }

    getRow(): number {
        return this.rowNumber;
    }

    isOpen(): boolean {
        return this.opened;
    }

    showButtonCloseView(): void {
        this.buttonCloseView.visible = true;
        this.buttonFlagView.visible = false;
        this.buttonQuestionView.visible = false;
        this.spriteView.visible = false;
    }

    showButtonFlagView(): void {
        this.buttonCloseView.visible = false;
        this.buttonFlagView.visible = true;
        this.buttonQuestionView.visible = false;
        this.spriteView.visible = false;
    }

    showButtonQuestionView(): void {
        this.buttonCloseView.visible = false;
        this.buttonFlagView.visible = false;
        this.buttonQuestionView.visible = true;
        this.spriteView.visible = false;
    }

    showSpriteOpenView(): void {
        this.buttonCloseView.visible = false;
        this.buttonFlagView.visible = false;
        this.buttonQuestionView.visible = false;
        this.spriteView.visible = true;
    }

    getButton(texture: PIXI.Texture): BaseButton {
        let button = new BaseButton(texture, undefined, undefined);
        button.height = config.tilesParams.tileHeight;
        button.width = config.tilesParams.tileWidth;
        this.addChild(button);
        return button;
    }
}