import SapperGameModel from "../saperGame/models/SapperGameModel";
import SapperGameArea from "../saperGame/views/SapperGameArea";
import * as PIXI from 'pixi.js';
import ButtonWithText from "../elements/buttons/ButtonWithText";
import SapperGameController from "../saperGame/conrollers/SapperGameController";
import LoaderManager from "../managers/LoaderManager";

export default class MainMenuScreen extends PIXI.Container {

    PLAY_BUTTON = {
        x: 200,
        y: 200,
        text: "Play",
        style: undefined,
        texture: "playButton"
    };

    constructor() {
        super();
        this.loadResourses();
    }

    createPlayButton(): void {
        const textureButton = LoaderManager.instance.getResourcesByName(this.PLAY_BUTTON.texture).texture;
        const playButton = new ButtonWithText(textureButton, this.PLAY_BUTTON.text, this.PLAY_BUTTON.style);
        playButton.position.set(this.PLAY_BUTTON.x, this.PLAY_BUTTON.y);
        playButton.onClick(this.onPlayButtonClick.bind(this));
        this.addChild(playButton)
    }

    onPlayButtonClick(): void {
        let sapperGameModel = new SapperGameModel(10, 10, 10);
        let gameArea = new SapperGameArea();
        SapperGameController.instance = new SapperGameController(gameArea, sapperGameModel);
        gameArea.startGame(SapperGameController.instance.getGameMatrix());
        this.addChild(gameArea);
    }

    loadResourses(){
        LoaderManager.instance = new LoaderManager();
        LoaderManager.instance.setBaseLoadCallback(this.createPlayButton.bind(this));
        LoaderManager.instance.addResourcesToLoadFromConfig();
        LoaderManager.instance.startLoad();
    }


}