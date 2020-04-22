import * as PIXI from "pixi.js";
import BaseDialog from "./BaseDialog";
import ButtonWithText from "../elements/buttons/ButtonWithText";
import SapperGameController from "../../conroller/SapperGameController";

/**
 * Класс окна паузы
 */
export default class PauseDialog extends BaseDialog {

    CONT_GAME_BUTTON = {
        x: 100,
        y: 100,
        text: "Continue",
        style: new PIXI.TextStyle({
            fill: "#83dad3",
            fontSize: 30
        }),
        xOffset: 90,
        yOffset: undefined,
        textureName: "continueGameButton"
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
        yOffset: undefined,
        textureName: "buttonToMainMenu"
    };

    /**
     * Создать окно паузы
     */
    constructor() {
        super();

        this.createShadow();

        this.addContinueGameButton();
        this.addExitToMenuButton();

        this.name = "PauseDialog";
    }

    /**
     * Создать и добавить кнопку продолжения игры
     */
    addContinueGameButton(): void {
        const params = this.CONT_GAME_BUTTON;
        const continueGameButton = new ButtonWithText(params.textureName, params.text, params.style);
        continueGameButton.setTextCenterPositionOffset(params.xOffset, params.yOffset);
        continueGameButton.position.set(params.x, params.y);
        continueGameButton.addClickHandler(this.onContinueGameClick.bind(this));
        this.addChild(continueGameButton);
    }

    /**
     * Создать и добавить кнопку выходя в меню
     */
    addExitToMenuButton(): void {
        const params = this.TO_MAIN_MENU_BUTTON;
        const exitToMenuButton = new ButtonWithText(params.textureName, params.text, params.style);
        exitToMenuButton.setTextCenterPositionOffset(params.xOffset, params.yOffset);
        exitToMenuButton.position.set(params.x, params.y);
        exitToMenuButton.addClickHandler(this.onExitToMenuClick.bind(this));
        this.addChild(exitToMenuButton);
    }

    /**
     * Логика на клик по кнопке продолжения игры
     */
    onContinueGameClick(): void {
        SapperGameController.instance.continueGame();
        this.close();
    }

    /**
     * Логика на клик по кнопке выхода в главное меню
     */
    onExitToMenuClick(): void {
        SapperGameController.instance.loseGame();
        SapperGameController.instance.closeGame();
    }
}