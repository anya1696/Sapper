import SapperGameModel from "../../models/SapperGameModel";
import SapperGameArea from "../gameArea/SapperGameArea";
import * as PIXI from 'pixi.js';
import ButtonWithText from "../elements/buttons/ButtonWithText";
import SapperGameController from "../../conrollers/SapperGameController";
import LoadManager from "../../managers/LoadManager";

export default class MainScreen extends PIXI.Container {
    mainMenu: PIXI.Container = new PIXI.Container();

    PLAY_BUTTON = {
        x: 200,
        y: 200,
        text: "Play",
        style: undefined,
        texture: "playButton"
    };

    constructor() {
        super();
        this.loadResources();
    }

    createPlayButton(): void {
        const textureButton = LoadManager.instance.getResourcesByName(this.PLAY_BUTTON.texture).texture;
        const playButton = new ButtonWithText(textureButton, this.PLAY_BUTTON.text, this.PLAY_BUTTON.style);
        playButton.position.set(this.PLAY_BUTTON.x, this.PLAY_BUTTON.y);
        playButton.addClickHandler(this.onPlayButtonClick.bind(this));
        this.mainMenu.addChild(playButton);
        this.addChild(this.mainMenu)
    }

    onPlayButtonClick(): void {
        let sapperGameModel = new SapperGameModel(10, 10, 10);
        let gameArea = new SapperGameArea();
        SapperGameController.instance = new SapperGameController(gameArea, sapperGameModel);
        SapperGameController.instance.setOnCloseGameCallback(this.onReturnToMainMenu.bind(this));
        SapperGameController.instance.startGame();
        this.addChild(gameArea);
        this.mainMenu.visible = false;
    }

    onReturnToMainMenu(): void{
        this.mainMenu.visible = true;
    }

    loadResources(){
        LoadManager.instance = new LoadManager();
        LoadManager.instance.setLoadCallback(this.createPlayButton.bind(this));
        LoadManager.instance.addResourcesToLoadFromConfig();
        LoadManager.instance.startLoad();
    }


}