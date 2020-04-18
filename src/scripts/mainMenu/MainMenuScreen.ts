import SapperGameModel from "../saperGame/models/SapperGameModel";
import SapperGameArea from "../saperGame/views/SapperGameArea";
import * as PIXI from 'pixi.js';
import ButtonWithText from "../elements/buttons/ButtonWithText";

export default class MainMenuScreen extends PIXI.Container {

    PLAY_BUTTON = {
        x: 200,
        y: 200,
        text: "Play",
        style: undefined
    };

    constructor() {
        super();
        this.createPlayButton();
    }

    createPlayButton(): void {
        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/256/000000/refresh.png");
        const playButton = new ButtonWithText(textureButton, this.PLAY_BUTTON.text, this.PLAY_BUTTON.style);
        playButton.position.set(this.PLAY_BUTTON.x, this.PLAY_BUTTON.y);
        playButton.onClick(this.onPlayButtonClick.bind(this));
        this.addChild(playButton)
    }

    onPlayButtonClick(): void {
        SapperGameModel.instance = new SapperGameModel(10, 10, 10);
        let gameArea = new SapperGameArea(SapperGameModel.instance.gameMatrix);
        SapperGameModel.instance.registerGameView(gameArea);
        this.addChild(gameArea);
    }


}