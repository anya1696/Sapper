import IViewTile from "../view/interfaces/IViewTile";
import SapperGameController from "../controller/SapperGameController";

export const BOMB_VALUE = -1;

/**
 * Класс модель для игры
 */
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

    /**
     * Создать модель
     * @param bombAmount число бомб на игровом поле
     * @param matrixWidth ширина игрового поля в тайлах
     * @param matrixHeight высота игрового поля в тайлах
     */
    constructor(bombAmount: number, matrixWidth: number, matrixHeight: number) {
        this._bombAmount = bombAmount;
        this.matrixWidth = matrixWidth;
        this.matrixHeight = matrixHeight;

        this._allSaveAmount = this.matrixWidth * this.matrixHeight - this._bombAmount;

        this._gameEnded = false;

        this._amountOpenedTile = 0;

        this.generateGridMatrix();
    }

    /**
     * Создание матрицы значений для поля
     */
    generateGridMatrix(): void {
        for (let i = 0; i < this.matrixHeight; i++) {
            let row: number[] = [];
            this._gameMatrix.push(row);
        }

        this.generateBombToMatrix();
        this.generateNumbers();
    }

    /**
     * Добавление бомб на матрицу
     */
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

    /**
     * Заполнение пустот в матрице цифрами с учетом бомб
     */
    generateNumbers(): void {
        for (let i = 0; i < this.matrixWidth; i++) {
            for (let j = 0; j < this.matrixHeight; j++) {
                if (this._gameMatrix[i][j] !== BOMB_VALUE)
                    this._gameMatrix[i][j] = this.countNearestBomb(i, j);
            }
        }
    }

    /**
     * Посчитать бомбы в радиусе 1 тайла по положению в матрице
     * @param x положение в строке
     * @param y положение в колонке
     * @returns {number} число бобм рядом
     */
    countNearestBomb(x: number, y: number): number {
        let bombAmount = 0;

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (this.isBomb(i, j)) bombAmount++;
            }
        }

        return bombAmount;
    }

    /**
     * Проверить является ли значение матрицы бомбой
     * @param xForCheck положение в строке
     * @param yForCheck положение в колонке
     * @returns {boolean} является ли значение матрицы бомбой
     */
    isBomb(xForCheck: number, yForCheck: number): boolean {
        let matrix = this._gameMatrix;
        return matrix[xForCheck] && matrix[xForCheck][yForCheck] != undefined && matrix[xForCheck][yForCheck] === BOMB_VALUE;
    }

    /**
     * Рекурсивное открытие тайлов после открытия любого тайла
     * @param tileView который должен открыться
     */
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
                let tile = SapperGameController.instance.getViewTileByCoord(i, j);
                if (tile) {
                    this.openTile(tile);
                }
            }
        }
    }

    /**
     * Закончить игру
     */
    loseGame(): void {
        this._gameEnded = true;
    }

    /**
     * Выиграть игру
     */
    winGame(): void {
        this._gameEnded = true;
        SapperGameController.instance.winGame();
    }

    /**
     * Поставить игру на паузу
     */
    pauseGame(): void {
        if (this.isPaused)
            return;
        this._isPaused = true;
    }

    /**
     * Продолжить игру
     */
    continueGame(): void {
        this._isPaused = false;
    }

    /**
     * Изменить значение счетчика флагов на поле
     * @param flagedAmount значение на которое изменится значение счетчика флагов
     */
    changeFlaggedAmount(flagedAmount: number): void {
        this.flagedAmount = flagedAmount;
    }

    /**
     * Увеличить значение счетчика флагов на 1
     */
    incFlaggedAmount(): void {
        this.changeFlaggedAmount(this.flagedAmount + 1);
    }

    /**
     * Уменьшить значение счетчика флагов на 1
     */
    decFlaggedAmount(): void {
        this.changeFlaggedAmount(this.flagedAmount - 1);
    }

    /**
     * Увеличить значение счетчика открытых тайлов на 1
     */
    incOpenedAmount(): void {
        this.amountOpenedTile = (this.amountOpenedTile + 1);
    }

}
