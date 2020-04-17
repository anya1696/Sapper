import * as PIXI from "pixi.js";
import BaseButton from "../elements/buttons/BaseButton";
import BaseDialog from "./BaseDialog";
import SapperGameModel from "../saperGame/models/SapperGameModel";

const CONT_GAME_BUTTON = {
    x: 100,
    y: 100
};

const PAUSE_GAME_BUTTON = {
    x: 100,
    y: 200
};

export default class PauseScreen extends BaseDialog {
    constructor() {
        super();

        this.createShadow();

        this.createContinueGameButton();
        this.createExitToMenuButton();
    }

    createContinueGameButton() {

        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/64/000000/ok-hand.png");
        const textureButtonDown = PIXI.Texture.from("https://img.icons8.com/dotty/80/000000/ok-hand.png");
        const textureButtonOver = PIXI.Texture.from("https://img.icons8.com/nolan/64/ok-hand.png");
        const continueGameButton = new BaseButton(textureButton, textureButtonDown, textureButtonOver);
        continueGameButton.position.set(CONT_GAME_BUTTON.x, CONT_GAME_BUTTON.y);
        continueGameButton.on("click", this.onContinueGameClick.bind(this));
        this.addChild(continueGameButton);
    }

    createExitToMenuButton() {

        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/64/000000/handshake.png");
        const textureButtonDown = PIXI.Texture.from("https://img.icons8.com/dotty/80/000000/helping-hand.png");
        const textureButtonOver = PIXI.Texture.from("https://img.icons8.com/nolan/64/handshake.png");
        const exitToMenuButton = new BaseButton(textureButton, textureButtonDown, textureButtonOver);
        exitToMenuButton.position.set(PAUSE_GAME_BUTTON.x, PAUSE_GAME_BUTTON.y);
        exitToMenuButton.on("click", this.onExitToMenuClick.bind(this));
        this.addChild(exitToMenuButton);
    }

    onContinueGameClick() {
        this.close();
    }

    onExitToMenuClick() {
        SapperGameModel.instance.loseGame();
        SapperGameModel.instance.closeGame();
    }

    show(): void {
    }
}