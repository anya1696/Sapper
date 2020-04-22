import SapperGameModel from "../../model/SapperGameModel";
import SapperGameArea from "../gameArea/SapperGameArea";
import * as PIXI from 'pixi.js';
import ButtonWithText from "../elements/buttons/ButtonWithText";
import SapperGameController from "../../conroller/SapperGameController";
import ResourcesManager from "../managers/ResourcesManager";

export default class MainScreen extends PIXI.Container {
    mainMenu: PIXI.Container = new PIXI.Container();

    PLAY_BUTTON = {
        x: 200,
        y: 200,
        text: "Play",
        style: undefined,
        textureName: "playButton"
    };
    private sapperGameModel: SapperGameModel | null = null;
    private gameArea: SapperGameArea | null = null;

    constructor() {
        super();
        this.loadResources();
    }

    addPlayButton(): void {
        const params = this.PLAY_BUTTON;
        const playButton = new ButtonWithText(params.textureName, params.text, params.style);
        playButton.position.set(params.x, params.y);
        playButton.addClickHandler(this.startNewGame.bind(this));
        this.mainMenu.addChild(playButton);
        this.addChild(this.mainMenu)
    }

    startNewGame(): void {
        this.sapperGameModel = new SapperGameModel(10, 10, 10);
        this.gameArea = new SapperGameArea();
        SapperGameController.instance = new SapperGameController(this.gameArea, this.sapperGameModel);
        SapperGameController.instance.setOnCloseGameCallback(this.onReturnToMainMenu.bind(this));
        SapperGameController.instance.startGame();

        this.addChild(this.gameArea);
        this.mainMenu.visible = false;
    }

    endGame(): void {
        if (this.gameArea) {
            this.removeChild(this.gameArea);
            this.gameArea.destroy();
        }

        this.sapperGameModel = null;
    }

    onReturnToMainMenu(): void {
        this.mainMenu.visible = true;
        this.endGame();
    }

    loadResources() {
        ResourcesManager.instance = new ResourcesManager();
        ResourcesManager.instance.setLoadCallback(this.addPlayButton.bind(this));
        ResourcesManager.instance.addResourcesToLoadFromConfig();
        ResourcesManager.instance.startLoad();
    }


}