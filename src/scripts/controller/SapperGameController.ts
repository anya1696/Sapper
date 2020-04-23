import SapperGameModel from "../model/SapperGameModel";
import SapperGameArea from "../view/gameArea/SapperGameArea";
import BaseGridTile from "../view/gridTileElements/BaseGridTile";

/**
 * Класс контроллер для игры
 */
export default class SapperGameController {
    private sapperGameView: SapperGameArea;
    private sapperGameModel: SapperGameModel;

    public static instance: SapperGameController;
    private onCloseGameCallback: (() => void) | null = null;

    /**
     * Создает контроллер
     * @param sapperGameView вью игрового поля
     * @param sapperGameModel модель игрового поля
     */
    constructor(sapperGameView: SapperGameArea, sapperGameModel: SapperGameModel) {
        this.sapperGameView = sapperGameView;
        this.sapperGameModel = sapperGameModel;

        //Указание методов с нужными биндами
        this.pauseGame = this.pauseGame.bind(this);
        this.continueGame = this.continueGame.bind(this);
    }

    /**
     * Увеличить значение счетчика открытых тайлов на 1 и обновить вью
     */
    incOpenedAmount(): void {
        this.sapperGameModel.incOpenedAmount();
        this.sapperGameView.onGameOpenTile(this.sapperGameModel.amountOpenedTile);
    }

    /**
     * Увеличить счетчик флаг тайлов на 1 и обновить вью
     */
    incFlaggedAmount(): void {
        this.sapperGameModel.incFlaggedAmount();
        this.updateFlagCounter();
    }

    /**
     * Уменьшить значение счетчика флаг тайлов на 1 и обновить вью
     */
    decFlaggedAmount(): void {
        this.sapperGameModel.decFlaggedAmount();
        this.updateFlagCounter();
    }

    /**
     * Получить текущее значение флагов на поле
     * @returns {number} текущее значение флагов на поле
     */
    getFlaggedAmount(): number {
        return this.sapperGameModel.flagedAmount;
    }

    /**
     * Получить кол-во числовых тайлов (без бомб)
     * @returns {number} кол-во числовых тайлов
     */
    getAllNumberTiles(): number {
        return this.sapperGameModel.allSaveAmount;
    }

    /**
     * Обновить вью счетчика флагов на поле
     */
    updateFlagCounter(): void {
        this.sapperGameView.onGameFlagChange(this.getFlaggedAmount());
    }

    /**
     * Вызов победы в игре
     */
    winGame(): void {
        this.sapperGameModel.gameEnded = true;
        this.sapperGameView.winGame();
    }

    /**
     * Выхов поражения
     */
    loseGame(): void {
        this.sapperGameModel.gameEnded = true;
        this.sapperGameView.loseGame();
    }

    /**
     * Закрыть и уничтожить вью игрового поля
     */
    closeGame(): void {
        this.sapperGameView.closeGame();
        if (this.onCloseGameCallback)
            this.onCloseGameCallback();
    }

    /**
     * Поставить игру на паузу и показать окно паузы
     */
    pauseGame(): void {
        if (this.sapperGameModel.isPaused)
            return;
        this.sapperGameModel.isPaused = true;
        this.sapperGameView.pauseGame();
    }

    /**
     * Снять игру с паузы
     */
    continueGame(): void {
        this.sapperGameModel.isPaused = false;
        this.sapperGameView.continueGame();
    }

    /**
     * Получить общее число бомб на поле
     * @returns {number}
     */
    getBombAmount(): number {
        return this.sapperGameModel.bombAmount
    }

    /**
     * Выставить иконку в стейт "открыто"
     * @param rowNumber номер строки
     * @param colNumber номер колонки
     */
    openViewTile(rowNumber: number, colNumber: number): void {
        this.sapperGameView.openViewTile(rowNumber, colNumber);
    }

    /**
     * Запустить логику, связанную с открытием тайла
     * @param tileView открываемый тайл
     */
    onTileClick(tileView: BaseGridTile): void {
        this.sapperGameModel.openTile(tileView);
    }

    /**
     * Отдает матрицу значений для игрового поля
     * @return {number[][]}
     */
    getGameMatrix(): number[][] {
        return this.sapperGameModel.gameMatrix;
    }

    /**
     * Установить колбек на закрытие игры
     * @param callback
     */
    setOnCloseGameCallback(callback: () => void): void {
        this.onCloseGameCallback = callback;
    }

    /**
     * Запустить вью игры
     */
    startGame(): void {
        this.sapperGameView.startGame(this.getGameMatrix());
    }

    /**
     * Получить вью тайла по его положению в матрице
     * @param rowNumber намер колонки
     * @param colNumber номер строки
     * @returns {BaseGridTile} вью тайла
     */
    getViewTileByCoord(rowNumber: number, colNumber: number): BaseGridTile | undefined {
        return this.sapperGameView.getViewTileByCoord(rowNumber, colNumber);
    }
}