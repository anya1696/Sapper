import * as PIXI from 'pixi.js';
import config from "../../../config/config.json";
import PauseDialog from "../dialogs/PauseDialog";
import LoseDialog from "../dialogs/LoseDialog";
import WinDialog from "../dialogs/WinDialog";
import IGameView from "../interfaces/IGameView";
import InfoPanel from "./InfoPanel";
import SapperGameController from "../../conroller/SapperGameController";
import BaseGridTile from "../gridTileElements/BaseGridTile";
import {BOMB_VALUE} from "../../model/SapperGameModel";
import BombGridTile from "../gridTileElements/BombGridTile";
import NumberGridTile from "../gridTileElements/NumberGridTile";
import ButtonWithText from "../elements/buttons/ButtonWithText";

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

    constructor() {
        super();
        this.name = "SapperGameArea";
    }

    startGame(gridMatrix: number[][]): void {
        this.addGridTiles(gridMatrix);
        this.createPauseButton();

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

    createPauseButton(): void {
        const params = this.PAUSE_BUTTON;
        let pauseButton = new ButtonWithText(params.textureName, params.text, params.style);
        pauseButton.position.set(params.x, params.y);
        pauseButton.addClickHandler(SapperGameController.instance.pauseGame);
        this.addChild(pauseButton);
    }

    showPauseScreen(): void {
        this.pauseScreen = new PauseDialog();
        this.addChild(this.pauseScreen);
        this.pauseScreen.show();
    }

    showWinScreen(): void {
        this.winScreen = new WinDialog();
        this.addChild(this.winScreen);
        this.winScreen.show();
    }

    hidePauseScreen(): void {
        if (this.pauseScreen === null) {
            return;
        }
        this.pauseScreen = null;

    }

    showLoseScreen(): void {
        let loseScreen = new LoseDialog();
        this.addChild(loseScreen);
        loseScreen.show();
    }

    closeGame(): void {
        this.gameEnded = true;
        this.destroy();
    }

    continueGame(): void {
        if (!this.gamePaused)
            return;
        this.gamePaused = false;
        this.hidePauseScreen();
    }

    loseGame(): void {
        if (this.gameEnded)
            return;
        this.gameEnded = true;
        this.showLoseScreen();
    }

    pauseGame(): void {
        this.gamePaused = true;
        this.showPauseScreen();
    }

    winGame(): void {
        this.gameEnded = true;
        this.showWinScreen();
    }

    onGameFlagChange(FlagTileAmount: number): void {
        if (!this.infoPanel)
            return;
        this.infoPanel.updateFlagTiles(SapperGameController.instance.getBombAmount() - FlagTileAmount);
    }

    onGameOpenTile(openedTileAmount: number): void {
        if (!this.infoPanel)
            return;
        this.infoPanel.updateOpenTiles(openedTileAmount);
    }

    openViewTile(rowNumber: number, colNumber: number): void {
        if (this.tileGrid && this.tileGrid[colNumber] && this.tileGrid[colNumber][rowNumber])
            this.tileGrid[colNumber][rowNumber].openTile();
    }

    getViewTileByCoord(rowNumber: number, colNumber: number): BaseGridTile | undefined {
        if (this.tileGrid && this.tileGrid[colNumber] && this.tileGrid[colNumber][rowNumber])
            return this.tileGrid[colNumber][rowNumber];
        return undefined;
    }

    public getTileByType(type: any, rowNumber: number, colNumber: number) {
        if (type === BOMB_VALUE) {
            return new BombGridTile(rowNumber, colNumber);
        } else {
            return new NumberGridTile(type, rowNumber, colNumber);
        }
    }

}
