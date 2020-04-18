import BaseGridTile from "../../elements/gridTileElements/BaseGridTile";
import SapperGameArea from "../views/SapperGameArea";
import IViewTile from "../../interfaces/IViewTile";
import IGameView from "../../interfaces/IGameView";

export const BOMB_VALUE = -1;

export default class SapperGameModel {
    set amountOpenedTile(value: int) {
        this._amountOpenedTile = value;
    }

    get bombAmount(): int {
        return this._bombAmount;
    }

    get flagedAmount(): int {
        return this._flagedAmount;
    }

    set flagedAmount(value: int) {
        this._flagedAmount = value;
    }

    private allSaveAmount: int;
    private _amountOpenedTile: int = 0;

    private matrixWidth: int;
    private matrixHeight: int;
    private _bombAmount: int;
    private tilesView: IViewTile[];
    private gameEnded: boolean;
    private _isPaused: boolean = false;

    private _flagedAmount: int = 0;

    gameView: IGameView | null;

    get isPaused(): boolean {
        return this._isPaused;
    }

    get amountOpenedTile(): int {
        return this._amountOpenedTile;
    }

    get gameMatrix(): int[][] {
        return this._gameMatrix;
    }

    public static instance: SapperGameModel;
    private _gameMatrix: int[][] = [];

    constructor(bombAmount: int, matrixWidth: int, matrixHeight: int) {
        this._bombAmount = bombAmount;
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;

        this.allSaveAmount = this.matrixWidth * this.matrixHeight - this._bombAmount;

        this.gameEnded = false;

        this.tilesView = [];
        this.gameView = null;

        this._amountOpenedTile = 0;

        this.generateGridMatrix();

        //Указание методов с нужными биндами
        this.pauseGame = this.pauseGame.bind(this);
        this.continueGame = this.continueGame.bind(this);
    }

    generateGridMatrix(): void {
        for (let i = 0; i < this.matrixHeight; i++) {
            let row: int[] = [];
            this._gameMatrix.push(row);
        }

        this.generateBombToMatrix();
        this.generateNumbers();
    }

    generateBombToMatrix(): void {
        for (let i = 0; i < this._bombAmount; i++) {
            let x = Math.floor(Math.random() * this.matrixWidth);
            let y = Math.floor(Math.random() * this.matrixHeight);
            while (this._gameMatrix[x][y]) {
                x = Math.floor(Math.random() * this.matrixWidth);
                y = Math.floor(Math.random() * this.matrixHeight);
            }
            this._gameMatrix[x][y] = BOMB_VALUE;
        }
    }

    generateNumbers(): void {
        for (let i = 0; i < this.matrixWidth; i++) {
            for (let j = 0; j < this.matrixHeight; j++) {
                if (this._gameMatrix[i][j] !== BOMB_VALUE)
                    this._gameMatrix[i][j] = this.countNealestBomb(i, j);
            }
        }
    }

    countNealestBomb(x: int, y: int): int {
        let bombAmount = 0;

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (this.isBomb(i, j)) bombAmount++;
            }
        }

        return bombAmount;
    }

    isBomb(xForCheck: int, yForCheck: int): boolean {
        let matrix = this._gameMatrix;
        return matrix[xForCheck] && matrix[xForCheck][yForCheck] != undefined && matrix[xForCheck][yForCheck] === BOMB_VALUE;
    }

    openViewTile(tileView: IViewTile): void {
        if (tileView.isOpen() || this.gameEnded) return;

        tileView.openTile();

        if (this._amountOpenedTile === this.allSaveAmount) {
            this.winGame();
        }

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

    registerTile(tile: BaseGridTile): void {
        this.tilesView.push(tile);
    }

    registerGameView(gameView: SapperGameArea): void {
        this.gameView = gameView;
    }

    findTileByRowCol(rowNumber: int, colNumber: int): IViewTile | null {
        for (let tile of this.tilesView) {
            if (tile.getRow() === rowNumber && tile.getCol() === colNumber)
                return tile;
        }
        return null;
    }

    loseGame(): void {
        this.gameEnded = true;
        if (this.gameView)
            this.gameView.loseGame();
    }

    winGame(): void {
        this.gameEnded = true;
        if (this.gameView)
            this.gameView.winGame();
    }

    closeGame(): void {
        if (this.gameView)
            this.gameView.closeGame();
    }

    pauseGame(): void {
        if (this.isPaused)
            return;
        this._isPaused = true;
        if (this.gameView) {
            this.gameView.pauseGame();
        }
    }

    continueGame(): void {
        this._isPaused = false;
        if (this.gameView)
            this.gameView.continueGame();
    }

    getAllNumberTiles(): int {
        return this.allSaveAmount;
    }

    changeFlagedAmount(flagedAmount: int): void {
        this.flagedAmount = flagedAmount;
        if (this.gameView)
            this.gameView.onGameFlagChange(flagedAmount);
    }

    incFlagedAmount(): void {
        this.changeFlagedAmount(this.flagedAmount + 1);
    }

    decFlagedAmount(): void {
        this.changeFlagedAmount(this.flagedAmount - 1);
    }

    incOpenedAmount(): void {
        this.amountOpenedTile = (this.amountOpenedTile + 1);
        if (this.gameView)
            this.gameView.onGameOpenTile(this._amountOpenedTile);
    }

}
