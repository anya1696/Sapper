import SapperGameModel from "../model/SapperGameModel";
import SapperGameArea from "../view/gameArea/SapperGameArea";
import BaseGridTile from "../view/gridTileElements/BaseGridTile";

export default class SapperGameController {
    private sapperGameView: SapperGameArea;
    private sapperGameModel: SapperGameModel;

    public static instance: SapperGameController;
    private onCloseGameCallback: (() => void) | null = null;

    constructor(sapperGameView: SapperGameArea, sapperGameModel: SapperGameModel) {
        this.sapperGameView = sapperGameView;
        this.sapperGameModel = sapperGameModel;

        //Указание методов с нужными биндами
        this.pauseGame = this.pauseGame.bind(this);
        this.continueGame = this.continueGame.bind(this);
    }

    incOpenedAmount(): void {
        this.sapperGameModel.incOpenedAmount();
        this.sapperGameView.onGameOpenTile(this.sapperGameModel.amountOpenedTile);
    }

    incFlaggedAmount(): void {
        this.sapperGameModel.incFlaggedAmount();
        this.updateFlagCounter();
    }

    decFlaggedAmount(): void {
        this.sapperGameModel.decFlaggedAmount();
        this.updateFlagCounter();
    }

    getFlaggedAmount(): number {
        return this.sapperGameModel.flagedAmount;
    }

    getAllNumberTiles(): number {
        return this.sapperGameModel.allSaveAmount;
    }

    updateFlagCounter(): void {
        this.sapperGameView.onGameFlagChange(this.getFlaggedAmount());
    }

    winGame(): void {
        this.sapperGameModel.gameEnded = true;
        this.sapperGameView.winGame();
    }

    loseGame(): void {
        this.sapperGameModel.gameEnded = true;
        this.sapperGameView.loseGame();
    }

    closeGame(): void {
        this.sapperGameView.closeGame();
        if (this.onCloseGameCallback)
            this.onCloseGameCallback();
    }

    pauseGame(): void {
        if (this.sapperGameModel.isPaused)
            return;
        this.sapperGameModel.isPaused = true;
        this.sapperGameView.pauseGame();
    }

    continueGame(): void {
        this.sapperGameModel.isPaused = false;
        this.sapperGameView.continueGame();
    }

    getBombAmount(): number {
        return this.sapperGameModel.bombAmount
    }

    openViewTile(rowNumber: number, colNumber: number): void {
        this.sapperGameView.openViewTile(rowNumber, colNumber);
    }

    onTileClick(tileView: BaseGridTile): void {
        this.sapperGameModel.openTile(tileView);
    }

    getGameMatrix(): number[][] {
        return this.sapperGameModel.gameMatrix;
    }

    setOnCloseGameCallback(callback: () => void): void {
        this.onCloseGameCallback = callback;
    }

    startGame(): void {
        this.sapperGameView.startGame(this.getGameMatrix());
    }

    getViewTileByCoord(rowNumber: number, colNumber: number): BaseGridTile | undefined {
        return this.sapperGameView.getViewTileByCoord(rowNumber, colNumber);
    }
}