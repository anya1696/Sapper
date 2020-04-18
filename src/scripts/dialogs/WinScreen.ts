import * as PIXI from "pixi.js";
import BaseDialog from "./BaseDialog";
import SapperGameModel from "../saperGame/models/SapperGameModel";
import ButtonWithText from "../elements/buttons/ButtonWithText";
import TextLabel from "../elements/TextLabel";

export default class WinScreen extends BaseDialog {

    EXIT_TO_MENU_GAME_BUTTON = {
        x: 250,
        y: 300,
        text: "To main menu",
        style: new PIXI.TextStyle({
            fill: "#83dad3",
            fontSize: 30
        }),
        xOffset: undefined,
        yOffset: 25
    };

    TEXT_ELEMENT = {
        x: 100,
        y: 150,
        text: "You win the game",
        style: new PIXI.TextStyle({
            fill: "#8efc83",
            fontFamily: "Arial Black",
            fontSize: 44
        })
    };

    constructor() {
        super();

        this.createShadow();

        this.createExitToMenuButton();
        this.createInfoText();
    }

    createExitToMenuButton(): void {
        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/64/000000/handshake.png");
        const params = this.EXIT_TO_MENU_GAME_BUTTON;
        const exitToMenuButton = new ButtonWithText(textureButton, params.text, params.style);
        exitToMenuButton.position.set(params.x, params.y);
        exitToMenuButton.setTextCenterPositionOffset(params.xOffset, params.yOffset);
        exitToMenuButton.onClick(this.onExitToMenuClick);
        this.addChild(exitToMenuButton);
    }

    onExitToMenuClick(): void {
        SapperGameModel.instance.loseGame();
        SapperGameModel.instance.closeGame();
    }

    createInfoText(): void {
        const params = this.TEXT_ELEMENT;
        const textElement = new TextLabel(params.text, params.style);
        textElement.position.set(params.x, params.y);
        this.addChild(textElement);
    }
}