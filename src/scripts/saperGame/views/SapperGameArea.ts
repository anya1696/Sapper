import * as PIXI from 'pixi.js';
import GridTileFab from "../../elements/gridTileElements/GridTileFab";
import config from "../../config/config.json";
import PauseButton from "./PauseButton";
import PauseScreen from "../../dialogs/PauseScreen";
import LoseScreen from "../../dialogs/LoseScreen";
import WinScreen from "../../dialogs/WinScreen";
import IGameView from "../../interfaces/IGameView";
import InfoPanel from "./InfoPanel";
import SapperGameController from "../conrollers/SapperGameController";
import BaseGridTile from "../../elements/gridTileElements/BaseGridTile";

export default class SapperGameArea extends PIXI.Container implements IGameView {
    tileGrid: BaseGridTile[][] = [];

    PAUSE_BUTTON = {
        x: 480,
        y: 200,
        text: "Pause"
    };

    INFO_PANEL = {
        x: 630,
        y: 200
    };

    private pauseScreen: PauseScreen | null = null;
    private winScreen: WinScreen | null = null;
    private infoPanel: InfoPanel | null = null;
    private gameEnded: boolean = false;
    private gamePaused: boolean = false;

    constructor() {
        super();
    }

    startGame(gridMatrix: int[][]): void {
        this.createGridTiles(gridMatrix);
        this.createPauseButton();

        this.infoPanel = new InfoPanel();
        this.infoPanel.position.set(this.INFO_PANEL.x, this.INFO_PANEL.y);
        this.addChild(this.infoPanel);

    }

    createGridTiles(gridMatrix: int[][]): void {
        let gridContainer = new PIXI.Container();
        gridContainer.name = "Game Field";
        const tileFab = new GridTileFab();
        let tileGrid: BaseGridTile[][] = [];

        for (let i = 0; i < gridMatrix.length; i++) {
            const row = gridMatrix[i];
            tileGrid.push([]);
            for (let j = 0; j < row.length; j++) {
                const tile = tileFab.getTileByType(gridMatrix[i][j], i, j);
                gridContainer.addChild(tile);
                tileGrid[i][j] = tile;
                tile.position.set(config.tilesParams.tileWidth * i, config.tilesParams.tileHeight * j);
            }
        }
        this.addChild(gridContainer);
        this.tileGrid = tileGrid;
    }

    createPauseButton(): void {
        let pauseButton = new PauseButton(this.PAUSE_BUTTON.text);
        pauseButton.position.set(this.PAUSE_BUTTON.x, this.PAUSE_BUTTON.y);
        pauseButton.onClick(SapperGameController.instance.pauseGame);
        this.addChild(pauseButton);
    }

    showPauseScreen(): void {
        this.pauseScreen = new PauseScreen();
        this.addChild(this.pauseScreen);
        this.pauseScreen.show();
    }

    showWinScreen(): void {
        this.winScreen = new WinScreen();
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
        let loseScreen = new LoseScreen();
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

    onGameFlagChange(FlagTileAmount: int): void {
        if (!this.infoPanel)
            return;
        this.infoPanel.updateFlagTiles(SapperGameController.instance.getBombAmount() - FlagTileAmount);
    }

    onGameOpenTile(openedTileAmount: int): void {
        if (!this.infoPanel)
            return;
        this.infoPanel.updateOpenTiles(openedTileAmount);
    }

    openViewTile(rowNumber: int, colNumber: int) {
        this.tileGrid[colNumber][rowNumber].openTile();
    }

}
