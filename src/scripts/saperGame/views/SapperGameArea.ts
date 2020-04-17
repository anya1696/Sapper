import * as PIXI from 'pixi.js';
import GridTileFab from "../../elements/gridTileElements/GridTileFab";
import config from "../../config/config.json";
import PauseButton from "./PauseButton";
import PauseScreen from "../../dialogs/PauseScreen";
import LoseScreen from "../../dialogs/LoseScreen";

export default class SapperGameArea extends PIXI.Container {

    PAUSE_BUTTON = {
      x:500,
      y:200
    };

    constructor(gridMatrix: int[][]) {
        super();

        let grid = this.createGridTiles(gridMatrix);
        this.addChild(grid);

        this.createPauseButton();
    }

    createGridTiles(gridMatrix: int[][]) {
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

    createPauseButton(){
        let pauseButton = new PauseButton();
        pauseButton.position.set(this.PAUSE_BUTTON.x, this.PAUSE_BUTTON.y);
        pauseButton.on("click", this.showPauseScreen.bind(this));
        this.addChild(pauseButton);
    }

    showPauseScreen(){
        let pauseScreen = new PauseScreen();
        this.addChild(pauseScreen);
        pauseScreen.show();
    }

    showLoseScreen(){
        let loseScreen = new LoseScreen();
        this.addChild(loseScreen);
        loseScreen.show();
    }

    exitGame(){
        this.destroy();
    }

}
