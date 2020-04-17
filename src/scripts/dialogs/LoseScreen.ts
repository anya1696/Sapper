import * as PIXI from "pixi.js";
import BaseButton from "../elements/buttons/BaseButton";
import BaseDialog from "./BaseDialog";
import SapperGameModel from "../saperGame/models/SapperGameModel";
import TextLabel from "../elements/TextLabel";

export default class LoseScreen extends BaseDialog {
    PAUSE_GAME_BUTTON = {
        x: 250,
        y: 300
    };

    TEXT_STYLE = new PIXI.TextStyle({
        fill: "#fc3968",
        fontFamily: "Arial Black",
        fontSize: 44
    });

    TEXT_ELEMENT = {
        x:100,
        y:150
    };

    constructor() {
        super();

        this.createShadow();
        this.createExitToMenuButton();
        this.createInfoText();

    }
    createExitToMenuButton() {
        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/64/000000/handshake.png");
        const textureButtonDown = PIXI.Texture.from("https://img.icons8.com/dotty/80/000000/helping-hand.png");
        const textureButtonOver = PIXI.Texture.from("https://img.icons8.com/nolan/64/handshake.png");
        const exitToMenuButton = new BaseButton(textureButton, textureButtonDown, textureButtonOver);
        exitToMenuButton.position.set(this.PAUSE_GAME_BUTTON.x, this.PAUSE_GAME_BUTTON.y);
        exitToMenuButton.on("click", this.onExitToMenuClick.bind(this));
        this.addChild(exitToMenuButton);
    }

    onExitToMenuClick() {
        SapperGameModel.instance.loseGame();
        SapperGameModel.instance.closeGame();
    }

    createInfoText(){
        const textElement = new TextLabel("You lost the game", this.TEXT_STYLE);
        textElement.position.set(this.TEXT_ELEMENT.x, this.TEXT_ELEMENT.y);
        this.addChild(textElement);
    }

    show(): void {
    }
}