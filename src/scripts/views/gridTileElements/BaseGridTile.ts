import * as PIXI from "pixi.js";
import config from "../../../config/config.json";
import IViewTile from "../interfaces/IViewTile";
import SapperGameController from "../../conrollers/SapperGameController";
import BaseButton from "../elements/buttons/BaseButton";
import LoadManager from "../../managers/LoadManager";
import StateMachine = require("@taoqf/javascript-state-machine");

export default abstract class BaseGridTile extends PIXI.Container implements IViewTile {
    get fsm(): StateMachine {
        return this._fsm;
    }

    TEXTURES = {
        close: "close",
        flag: "flag",
        question: "question"
    };

    private buttonCloseView: BaseButton;
    private buttonFlagView: BaseButton;
    private buttonQuestionView: BaseButton;
    private _fsm: StateMachine;

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
        this.buttonCloseView.name = "buttonCloseView";
        this.buttonFlagView = this.getButton(this.flagTexture);
        this.buttonFlagView.name = "buttonFlagView";
        this.buttonQuestionView = this.getButton(this.questionTexture);
        this.buttonQuestionView.name = "buttonQuestionView";

        this.spriteView = PIXI.Sprite.from(this.openTexture);
        this.spriteView.visible = false;
        this.spriteView.anchor.set(0.5, 0.5);

        this.spriteView.height = config.tilesParams.tileHeight;
        this.spriteView.width = config.tilesParams.tileWidth;

        this._colNumber = colNumber;
        this._rowNumber = rowNumber;

        SapperGameController.instance.registerTile(this);
        this.on('click', this.onClick);
        this.on('rightclick', this.onRightClick);

        this.interactive = true;

        this.addChild(this.spriteView);

        // @ts-ignore
        this._fsm = new StateMachine(config.tileFsmConfig);

        this._fsm.observe('onClosed', this.onCloseState.bind(this));
        this._fsm.observe('onFlagged', this.onFlagState.bind(this));
        this._fsm.observe('onOpened', this.onOpenState.bind(this));
        this._fsm.observe('onQuestioned', this.onQuestionState.bind(this));

        this.onCloseState();
    }

    setOpenState(): void {
        if (!this._fsm.can("toOpen"))
            return;
        // @ts-ignore
        this._fsm.toOpen();
    }

    openTile(): void {
        this.setOpenState();
    }

    onClick(): void {
    }

    onRightClick(): void {
        if (!this.fsm.can("rightClick")) {
            return;
        }
        // @ts-ignore
        this.fsm.rightClick();
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
        return this.fsm.is("opened");
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

    onFlagState(): void {
        this.showButtonFlagView();
        SapperGameController.instance.incFlaggedAmount();
    }

    onOpenState(): void {
        this.spriteView.texture = this.openTexture;
        this.showSpriteOpenView();
        SapperGameController.instance.incOpenedAmount();
    }

    onCloseState(): void {
        this.showButtonCloseView();
    }

    onQuestionState(): void {
        this.showButtonQuestionView();
        SapperGameController.instance.decFlaggedAmount();
    }
}