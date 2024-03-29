import * as PIXI from 'pixi.js';
import config from "../../../config/config.json";
import PauseDialog from "../dialogs/PauseDialog";
import LoseDialog from "../dialogs/LoseDialog";
import WinDialog from "../dialogs/WinDialog";
import IGameView from "../interfaces/IGameView";
import InfoPanel from "./InfoPanel";
import SapperGameController from "../../controller/SapperGameController";
import BaseGridTile from "../gridTileElements/BaseGridTile";
import {BOMB_VALUE} from "../../model/SapperGameModel";
import BombGridTile from "../gridTileElements/BombGridTile";
import NumberGridTile from "../gridTileElements/NumberGridTile";
import ButtonWithText from "../elements/buttons/ButtonWithText";

/**
 * Класс игровой зоны
 */
export default class SapperGameArea extends PIXI.Container implements IGameView {
    tileGrid: BaseGridTile[][] = [];

    PAUSE_BUTTON = {
        x: 510,
        y: 90,
        text: "Pause",
        textureName: "pauseButton",
        style: undefined
    };

    TILE_GRID = {
        x: 20,
        y: 20
    };

    INFO_PANEL = {
        x: 470,
        y: 200
    };

    private pauseScreen: PauseDialog | null = null;
    private winScreen: WinDialog | null = null;
    private infoPanel: InfoPanel | null = null;
    private gameEnded: boolean = false;
    private gamePaused: boolean = false;

    /**
     * Создать игрово зону
     */
    constructor() {
        super();
        this.name = "SapperGameArea";
    }

    /**
     * Начать игру и создать игровую зону (поле, панель инфо)
     * @param gridMatrix матрица значений поля, создается в SapperGameModel
     */
    startGame(gridMatrix: number[][]): void {
        this.addGridTiles(gridMatrix);
        this.addPauseButton();

        this.infoPanel = new InfoPanel();
        this.infoPanel.position.set(this.INFO_PANEL.x, this.INFO_PANEL.y);
        this.addChild(this.infoPanel);
    }

    /**
     * Создание и добавление сетки тайлов сапера по матрице значений
     * @param {number[][]} gridMatrix Матрица, с заранее сгенеренными значениями будующих тайлов
     */
    addGridTiles(gridMatrix: number[][]): void {
        let gridContainer = new PIXI.Container();
        gridContainer.name = "Game Field";
        let tileGrid: BaseGridTile[][] = [];

        for (let i = 0; i < gridMatrix.length; i++) {
            const row = gridMatrix[i];
            tileGrid.push([]);
            for (let j = 0; j < row.length; j++) {
                const tile = this.getTileByType(gridMatrix[i][j], i, j);
                gridContainer.addChild(tile);
                tileGrid[i][j] = tile;
                tile.position.set(config.tilesParams.tileWidth * i, config.tilesParams.tileHeight * j);
            }
        }

        gridContainer.position.set(this.TILE_GRID.x, this.TILE_GRID.y);

        this.addChild(gridContainer);
        this.tileGrid = tileGrid;
    }

    /**
     * Создать и добавить кнопку паузы игры
     */
    addPauseButton(): void {
        const params = this.PAUSE_BUTTON;
        let pauseButton = new ButtonWithText(params.textureName, params.text, params.style);
        pauseButton.position.set(params.x, params.y);
        pauseButton.addClickHandler(SapperGameController.instance.pauseGame);
        this.addChild(pauseButton);
    }

    /**
     * Показать диалог паузы
     */
    showPauseScreen(): void {
        this.pauseScreen = new PauseDialog();
        this.addChild(this.pauseScreen);
        this.pauseScreen.show();
    }

    /**
     * Показать диалог победы
     */
    showWinScreen(): void {
        this.winScreen = new WinDialog();
        this.addChild(this.winScreen);
        this.winScreen.show();
    }

    /**
     * Закрыть окно паузы
     */
    hidePauseScreen(): void {
        if (this.pauseScreen === null) {
            return;
        }
        this.pauseScreen = null;

    }

    /**
     * Показать окно поражения
     */
    showLoseScreen(): void {
        let loseScreen = new LoseDialog();
        this.addChild(loseScreen);
        loseScreen.show();
    }

    /**
     * закрыть игровую зону и уничтожить
     */
    closeGame(): void {
        this.gameEnded = true;
        this.destroy();
    }

    /**
     * Снять игровое поле с паузы
     */
    continueGame(): void {
        if (!this.gamePaused)
            return;
        this.gamePaused = false;
        this.hidePauseScreen();
    }

    /**
     * Поведение игровой зоны при поражении
     */
    loseGame(): void {
        if (this.gameEnded)
            return;
        this.gameEnded = true;
        this.showLoseScreen();
    }

    /**
     * Поставить игровую зону на паузу
     */
    pauseGame(): void {
        this.gamePaused = true;
        this.showPauseScreen();
    }

    /**
     * Поведение игровой зоны при победе
     */
    winGame(): void {
        this.gameEnded = true;
        this.showWinScreen();
    }

    /**
     * Поведени при изменении числа флагов на поле
     * @param FlagTileAmount новое число флагов на поле
     */
    onGameFlagChange(FlagTileAmount: number): void {
        if (!this.infoPanel)
            return;
        this.infoPanel.updateFlagTiles(SapperGameController.instance.getBombAmount() - FlagTileAmount);
    }

    /**
     * Поведение ировой зоны при открытии любого тайла и обновление счетчика открытых тайлов
     * @param openedTileAmount
     */
    onGameOpenTile(openedTileAmount: number): void {
        if (!this.infoPanel)
            return;
        this.infoPanel.updateOpenTiles(openedTileAmount);
    }

    /**
     * Открыть вью тайла по его координатам
     * @param rowNumber номер строки тайла
     * @param colNumber номер колонки тайла
     */
    openViewTile(rowNumber: number, colNumber: number): void {
        if (this.tileGrid && this.tileGrid[colNumber] && this.tileGrid[colNumber][rowNumber])
            this.tileGrid[colNumber][rowNumber].openTile();
    }

    /**
     * Получить вью тайла по координатам, если тайл существует. Иначе возвращает undefined
     * @param rowNumber номер строки тайла
     * @param colNumber номер колонки тайла
     * @returns {BaseGridTile | undefined} Если тайл существует, возвращает тайл, иначе undefined
     */
    getViewTileByCoord(rowNumber: number, colNumber: number): BaseGridTile | undefined {
        if (this.tileGrid && this.tileGrid[colNumber] && this.tileGrid[colNumber][rowNumber])
            return this.tileGrid[colNumber][rowNumber];
        return undefined;
    }

    /**
     * Создает и возвращает тайл по его зачению-типу
     * @param type тип-значение тайла, (бомба, 0-8)
     * @param rowNumber номер строки тайла
     * @param colNumber номер колонки тайла
     * @returns {BaseGridTile} Иконка тайла
     */
    public getTileByType(type: any, rowNumber: number, colNumber: number): BaseGridTile {
        if (type === BOMB_VALUE) {
            return new BombGridTile(rowNumber, colNumber);
        } else {
            return new NumberGridTile(type, rowNumber, colNumber);
        }
    }

}
