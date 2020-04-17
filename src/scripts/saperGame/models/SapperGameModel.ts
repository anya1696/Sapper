import BaseGridTile from "../../elements/gridTileElements/BaseGridTile";
import SapperGameArea from "../views/SapperGameArea";

export interface IViewTile {
    shouldProvokeRecursive(): boolean;
    getRow(): int;
    getCol(): int;
    openTile(): void;
    isOpen(): boolean;
}

const BOMB_VALUE = -1;

export default class SapperGameModel {
    get amountOpenedTile(): int {
        return this._amountOpenedTile;
    }

    private matrixWidth: int;
    private matrixHeight: int;
    private bombAmount: int;
    private tilesView: IViewTile[];
    private gameEnded: boolean;

    private _amountOpenedTile: int;

    gameView: SapperGameArea | null;

    get gameMatrix(): any[][] {
        return this._gameMatrix;
    }

    public static instance = new SapperGameModel(10, 10, 10);
    private _gameMatrix: int[][] = [];

    constructor(bombAmount: int, matrixWidth: int, matrixHeight: int) {
        this.bombAmount = bombAmount;
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;

        this.gameEnded = false;

        this.tilesView = [];
        this.gameView = null;

        this._amountOpenedTile = 0;

        this.generateGridMatrix();
    }

    generateGridMatrix() {
        let matrix = this._gameMatrix;
        for (let i = 0; i < this.matrixHeight; i++) {
            let row: int[] = [];
            matrix.push(row);
        }

        this.generateBombToMatrix();
        this.generateNumbers();

        return matrix;
    }

    generateBombToMatrix() {
        for (let i = 0; i < this.bombAmount; i++) {
            let x = Math.floor(Math.random() * this.matrixWidth);
            let y = Math.floor(Math.random() * this.matrixHeight);
            while (this._gameMatrix[x][y]) {
                x = Math.floor(Math.random() * this.matrixWidth);
                y = Math.floor(Math.random() * this.matrixHeight);
            }
            this._gameMatrix[x][y] = BOMB_VALUE;
        }
    }

    generateNumbers() {
        for (let i = 0; i < this.matrixWidth; i++) {
            for (let j = 0; j < this.matrixHeight; j++) {
                if (this._gameMatrix[i][j] !== BOMB_VALUE)
                    this._gameMatrix[i][j] = this.countNealestBomb(i, j);
            }
        }
    }

    countNealestBomb(x: int, y: int) {
        let bombAmount = 0;

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (this.isBomb(i, j)) bombAmount++;
            }
        }

        return bombAmount;
    }

    isBomb(xForCheck: int, yForCheck: int) {
        let matrix = this._gameMatrix;
        return matrix[xForCheck] && matrix[xForCheck][yForCheck] && matrix[xForCheck][yForCheck] === BOMB_VALUE;
    }

    openViewTile(tileView: IViewTile) {
        if (tileView.isOpen() || this.gameEnded) return;

        tileView.openTile();
        this._amountOpenedTile++;

        if (!tileView.shouldProvokeRecursive()) {
            return;
        }
        const rowNumber = tileView.getRow();
        const colNumber = tileView.getCol();

        for (let i = rowNumber - 1; i <= rowNumber + 1; i++) {
            for (let j = colNumber - 1; j <= colNumber + 1; j++) {
                let tile = this.findTileByRowCol(i, j);
                if (tile) {
                    this.openViewTile(tile);
                }
            }
        }
    }

    registerTile(tile: BaseGridTile) {
        this.tilesView.push(tile);
    }

    registerGameView(gameView: SapperGameArea) {
        this.gameView = gameView;
    }

    findTileByRowCol(rowNumber: int, colNumber: int): IViewTile | null {
        for (let tile of this.tilesView) {
            if (tile.getRow() === rowNumber && tile.getCol() === colNumber)
                return tile;
        }
        return null;
    }

    loseGame() {
        this.gameEnded = true;
        if (this.gameView)
            this.gameView.showLoseScreen();
    }

    closeGame() {
        if (this.gameView)
            this.gameView.exitGame();
    }

}
