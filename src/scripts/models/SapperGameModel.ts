import BaseGridTile from "../views/gridTileElements/BaseGridTile";
import IViewTile from "../views/interfaces/IViewTile";
import SapperGameController from "../conrollers/SapperGameController";

export const BOMB_VALUE = -1;

export default class SapperGameModel {
    set isPaused(value: boolean) {
        this._isPaused = value;
    }

    get gameEnded(): boolean {
        return this._gameEnded;
    }

    set gameEnded(value: boolean) {
        this._gameEnded = value;
    }

    get allSaveAmount(): number {
        return this._allSaveAmount;
    }

    set amountOpenedTile(value: number) {
        this._amountOpenedTile = value;
    }

    get bombAmount(): number {
        return this._bombAmount;
    }

    get flagedAmount(): number {
        return this._flagedAmount;
    }

    set flagedAmount(value: number) {
        this._flagedAmount = value;
    }

    private _allSaveAmount: number;
    private _amountOpenedTile: number = 0;

    private matrixWidth: number;
    private matrixHeight: number;
    private _bombAmount: number;
    private _tilesView: IViewTile[];
    private _gameEnded: boolean;
    private _isPaused: boolean = false;

    private _flagedAmount: number = 0;

    get isPaused(): boolean {
        return this._isPaused;
    }

    get amountOpenedTile(): number {
        return this._amountOpenedTile;
    }

    get gameMatrix(): number[][] {
        return this._gameMatrix;
    }

    private _gameMatrix: number[][] = [];

    constructor(bombAmount: number, matrixWidth: number, matrixHeight: number) {
        this._bombAmount = bombAmount;
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;

        this._allSaveAmount = this.matrixWidth * this.matrixHeight - this._bombAmount;

        this._gameEnded = false;

        this._tilesView = [];

        this._amountOpenedTile = 0;

        this.generateGridMatrix();
    }

    generateGridMatrix(): void {
        for (let i = 0; i < this.matrixHeight; i++) {
            let row: number[] = [];
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

    countNealestBomb(x: number, y: number): number {
        let bombAmount = 0;

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (this.isBomb(i, j)) bombAmount++;
            }
        }

        return bombAmount;
    }

    isBomb(xForCheck: number, yForCheck: number): boolean {
        let matrix = this._gameMatrix;
        return matrix[xForCheck] && matrix[xForCheck][yForCheck] != undefined && matrix[xForCheck][yForCheck] === BOMB_VALUE;
    }

    openTile(tileView: IViewTile): void {
        if (tileView.isOpen() || this._gameEnded) return;

        const rowNumber = tileView.getRow();
        const colNumber = tileView.getCol();

        SapperGameController.instance.openViewTile(rowNumber, colNumber);

        if (this._amountOpenedTile === this._allSaveAmount) {
            this.winGame();
        }

        if (!tileView.shouldProvokeRecursive()) {
            return;
        }

        for (let i = rowNumber - 1; i <= rowNumber + 1; i++) {
            for (let j = colNumber - 1; j <= colNumber + 1; j++) {
                let tile = this.findTileByRowCol(i, j);
                if (tile) {
                    this.openTile(tile);
                }
            }
        }
    }

    registerTile(tile: BaseGridTile): void {
        this._tilesView.push(tile);
    }

    findTileByRowCol(rowNumber: number, colNumber: number): IViewTile | null {
        for (let tile of this._tilesView) {
            if (tile.getRow() === rowNumber && tile.getCol() === colNumber)
                return tile;
        }
        return null;
    }

    loseGame(): void {
        this._gameEnded = true;
    }

    winGame(): void {
        this._gameEnded = true;
        SapperGameController.instance.winGame();
    }

    pauseGame(): void {
        if (this.isPaused)
            return;
        this._isPaused = true;
    }

    continueGame(): void {
        this._isPaused = false;
    }

    changeFlagedAmount(flagedAmount: number): void {
        this.flagedAmount = flagedAmount;
    }

    incFlagedAmount(): void {
        this.changeFlagedAmount(this.flagedAmount + 1);
    }

    decFlagedAmount(): void {
        this.changeFlagedAmount(this.flagedAmount - 1);
    }

    incOpenedAmount(): void {
        this.amountOpenedTile = (this.amountOpenedTile + 1);
    }

}