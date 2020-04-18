import * as PIXI from "pixi.js";
import BaseDialog from "./BaseDialog";
import ButtonWithText from "../elements/buttons/ButtonWithText";
import SapperGameController from "../saperGame/conrollers/SapperGameController";

export default class PauseScreen extends BaseDialog {

    CONT_GAME_BUTTON = {
        x: 100,
        y: 100,
        text: "Continue",
        style: new PIXI.TextStyle({
            fill: "#83dad3",
            fontSize: 30
        }),
        xOffset: 90,
        yOffset: undefined
    };

    TO_MAIN_MENU_BUTTON = {
        x: 100,
        y: 200,
        text: "Exit to main menu",
        style: new PIXI.TextStyle({
            fill: "#83dad3",
            fontSize: 30
        }),
        xOffset: 158,
        yOffset: undefined
    };

    constructor() {
        super();

        this.createShadow();

        this.createContinueGameButton();
        this.createExitToMenuButton();
    }

    createContinueGameButton(): void {
        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/64/000000/ok-hand.png");
        const params = this.CONT_GAME_BUTTON;
        const continueGameButton = new ButtonWithText(textureButton, params.text, params.style);
        continueGameButton.setTextCenterPositionOffset(params.xOffset, params.yOffset);
        continueGameButton.position.set(params.x, params.y);
        continueGameButton.onClick(this.onContinueGameClick.bind(this));
        this.addChild(continueGameButton);
    }

    createExitToMenuButton(): void {
        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/64/000000/handshake.png");
        const params = this.TO_MAIN_MENU_BUTTON;
        const exitToMenuButton = new ButtonWithText(textureButton, params.text, params.style);
        exitToMenuButton.setTextCenterPositionOffset(params.xOffset, params.yOffset);
        exitToMenuButton.position.set(params.x, params.y);
        exitToMenuButton.onClick(this.onExitToMenuClick.bind(this));
        this.addChild(exitToMenuButton);
    }

    onContinueGameClick(): void {
        SapperGameController.instance.continueGame();
        this.close();
    }

    onExitToMenuClick(): void {
        SapperGameController.instance.loseGame();
        SapperGameController.instance.closeGame();
    }
}