import * as PIXI from "pixi.js";
import BaseDialog from "./BaseDialog";
import ButtonWithText from "../elements/buttons/ButtonWithText";
import TextLabel from "../elements/TextLabel";
import SapperGameController from "../../conroller/SapperGameController";

export default class WinDialog extends BaseDialog {

    EXIT_TO_MENU_GAME_BUTTON = {
        x: 250,
        y: 300,
        text: "To main menu",
        style: new PIXI.TextStyle({
            fill: "#83dad3",
            fontSize: 30
        }),
        xOffset: undefined,
        yOffset: 25,
        textureName: "buttonToMainMenu"
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

        this.addExitToMenuButton();
        this.addInfoText();

        this.name = "WinDialog";
    }

    addExitToMenuButton(): void {
        const params = this.EXIT_TO_MENU_GAME_BUTTON;
        const exitToMenuButton = new ButtonWithText(params.textureName, params.text, params.style);
        exitToMenuButton.position.set(params.x, params.y);
        exitToMenuButton.setTextCenterPositionOffset(params.xOffset, params.yOffset);
        exitToMenuButton.addClickHandler(this.onExitToMenuClick);
        this.addChild(exitToMenuButton);
    }

    onExitToMenuClick(): void {
        SapperGameController.instance.closeGame();
    }

    addInfoText(): void {
        const params = this.TEXT_ELEMENT;
        const textElement = new TextLabel(params.text, params.style);
        textElement.position.set(params.x, params.y);
        this.addChild(textElement);
    }
}