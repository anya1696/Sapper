import * as PIXI from "pixi.js";
import BaseDialog from "./BaseDialog";
import TextLabel from "../elements/TextLabel";
import ButtonWithText from "../elements/buttons/ButtonWithText";
import SapperGameController from "../../conrollers/SapperGameController";
import LoadManager from "../../managers/LoadManager";

export default class LoseScreen extends BaseDialog {
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
        texture: "buttonToMainMenu"
    };

    TEXT_ELEMENT = {
        x: 100,
        y: 150,
        text: "You lost the game",
        style: new PIXI.TextStyle({
            fill: "#fc3968",
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
        const params = this.EXIT_TO_MENU_GAME_BUTTON;
        const textureButton = LoadManager.instance.getResourcesByName(params.texture).texture;
        const exitToMenuButton = new ButtonWithText(textureButton, params.text, params.style);
        exitToMenuButton.position.set(params.x, params.y);
        exitToMenuButton.setTextCenterPositionOffset(params.xOffset, params.yOffset);
        exitToMenuButton.addClickHandler(this.onExitToMenuClick);
        this.addChild(exitToMenuButton);
    }

    onExitToMenuClick(): void {
        SapperGameController.instance.closeGame();
    }

    createInfoText(): void {
        const params = this.TEXT_ELEMENT;
        const textElement = new TextLabel(params.text, params.style);
        textElement.position.set(params.x, params.y);
        this.addChild(textElement);
    }
}