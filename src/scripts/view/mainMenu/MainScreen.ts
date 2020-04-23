import SapperGameModel from "../../model/SapperGameModel";
import SapperGameArea from "../gameArea/SapperGameArea";
import * as PIXI from 'pixi.js';
import ButtonWithText from "../elements/buttons/ButtonWithText";
import SapperGameController from "../../controller/SapperGameController";
import ResourceManager from "../managers/ResourceManager";

/**
 * Класс скрин главного экрана
 */
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

    /**
     * Создать скрин главного экрана
     */
    constructor() {
        super();
        this.loadResources();
    }

    /**
     * Создать и добавить кнопку начала игры
     */
    addPlayButton(): void {
        const params = this.PLAY_BUTTON;
        const playButton = new ButtonWithText(params.textureName, params.text, params.style);
        playButton.position.set(params.x, params.y);
        playButton.addClickHandler(this.startNewGame.bind(this));
        this.mainMenu.addChild(playButton);
        this.addChild(this.mainMenu)
    }

    /**
     * Начать новую игру. Создать модель, вью игровой зоны, контроллер
     */
    startNewGame(): void {
        this.sapperGameModel = new SapperGameModel(10, 10, 10);
        this.gameArea = new SapperGameArea();
        SapperGameController.instance = new SapperGameController(this.gameArea, this.sapperGameModel);
        SapperGameController.instance.setOnCloseGameCallback(this.onReturnToMainMenu.bind(this));
        SapperGameController.instance.startGame();

        this.addChild(this.gameArea);
        this.mainMenu.visible = false;
    }

    /**
     * Поведение при закрытие игры. Обнуление модели и дестрой вью
     */
    endGame(): void {
        if (this.gameArea) {
            this.removeChild(this.gameArea);
            this.gameArea.destroy();
            this.gameArea = null;
        }

        this.sapperGameModel = null;
    }

    /**
     * Вызвать возвращение в главное меню и окончание игры.
     */
    onReturnToMainMenu(): void {
        this.mainMenu.visible = true;
        this.endGame();
    }

    /**
     * Загрузить ресурсы игры. Ресурсы загружаются по конфигу config.
     */
    loadResources() {
        ResourceManager.instance = new ResourceManager();
        ResourceManager.instance.setLoadCallback(this.addPlayButton.bind(this));
        ResourceManager.instance.addResourcesToLoadFromConfig();
        ResourceManager.instance.startLoad();
    }


}