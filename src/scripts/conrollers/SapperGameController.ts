import SapperGameModel from "../models/SapperGameModel";
import SapperGameArea from "../views/gameArea/SapperGameArea";
import BaseGridTile from "../views/gridTileElements/BaseGridTile";

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

    incFlagedAmount(): void {
        this.sapperGameModel.incFlagedAmount();
        this.updateFlagCounter();
    }

    decFlagedAmount(): void {
        this.sapperGameModel.decFlagedAmount();
        this.updateFlagCounter();
    }

    getFlagedAmount(): number {
        return this.sapperGameModel.flagedAmount;
    }

    getAllNumberTiles(): number {
        return this.sapperGameModel.allSaveAmount;
    }

    updateFlagCounter(): void {
        this.sapperGameView.onGameFlagChange(this.getFlagedAmount());
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

    registerTile(tile: BaseGridTile): void {
        this.sapperGameModel.registerTile(tile);
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

    startGame(): void{
        this.sapperGameView.startGame(this.getGameMatrix());
    }
}