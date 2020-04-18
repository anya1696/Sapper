import * as PIXI from 'pixi.js';
import GridTileFab from "../../elements/gridTileElements/GridTileFab";
import config from "../../config/config.json";
import PauseButton from "./PauseButton";
import PauseScreen from "../../dialogs/PauseScreen";
import LoseScreen from "../../dialogs/LoseScreen";
import SapperGameModel from "../models/SapperGameModel";
import WinScreen from "../../dialogs/WinScreen";
import IGameView from "../../interfaces/IGameView";
import InfoPanel from "./InfoPanel";

export default class SapperGameArea extends PIXI.Container implements IGameView {
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
    private infoPanel: InfoPanel;

    constructor(gridMatrix: int[][]) {
        super();

        let grid = this.createGridTiles(gridMatrix);
        this.addChild(grid);

        this.createPauseButton();

        this.infoPanel = new InfoPanel();
        this.infoPanel.position.set(this.INFO_PANEL.x, this.INFO_PANEL.y);
        this.addChild(this.infoPanel);
    }

    createGridTiles(gridMatrix: int[][]): PIXI.Container {
        let grid = new PIXI.Container();
        grid.name = "Game Field";
        const tileFab = new GridTileFab();

        for (let i = 0; i < gridMatrix.length; i++) {
            const row = gridMatrix[i];
            for (let j = 0; j < row.length; j++) {
                const tile = tileFab.getTileByType(gridMatrix[i][j], i, j);
                grid.addChild(tile);
                tile.position.set(config.tilesParams.tileWidth * i, config.tilesParams.tileHeight * j);
            }
        }
        return grid;
    }

    createPauseButton(): void {
        let pauseButton = new PauseButton(this.PAUSE_BUTTON.text);
        pauseButton.position.set(this.PAUSE_BUTTON.x, this.PAUSE_BUTTON.y);
        pauseButton.onClick(SapperGameModel.instance.pauseGame);
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
        this.destroy();
    }

    continueGame(): void {
        this.hidePauseScreen();
    }

    loseGame(): void {
        this.showLoseScreen();
    }

    pauseGame(): void {
        this.showPauseScreen();
    }

    winGame(): void {
        this.showWinScreen();
    }

    onGameFlagChange(FlagTileAmount: int): void {
        this.infoPanel.updateFlagTiles(SapperGameModel.instance.bombAmount - FlagTileAmount);
    }

    onGameOpenTile(openedTileAmount: int): void {
        this.infoPanel.updateOpenTiles(openedTileAmount);
    }

}
