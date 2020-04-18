import SapperGameModel from "../models/SapperGameModel";
import SapperGameArea from "../views/SapperGameArea";
import BaseGridTile from "../../elements/gridTileElements/BaseGridTile";
import IViewTile from "../../interfaces/IViewTile";

export default class SapperGameController {
    private sapperGameView: SapperGameArea;
    private sapperGameModel: SapperGameModel;

    public static instance: SapperGameController;

    constructor(sapperGameView: SapperGameArea, sapperGameModel: SapperGameModel) {
        this.sapperGameView = sapperGameView;
        this.sapperGameModel = sapperGameModel;

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

    getFlagedAmount(): int {
        return this.sapperGameModel.flagedAmount;
    }

    getAllNumberTiles(): int {
        return this.sapperGameModel.allSaveAmount;
    }

    updateFlagCounter(): void  {
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
    
    getBombAmount(): int{
        return this.sapperGameModel.bombAmount
    }

    openViewTile(tileView: IViewTile): void {
        this.sapperGameModel.openViewTile(tileView);
    }

    getGameMatrix(): int[][] {
        return this.sapperGameModel.gameMatrix;
    }

}