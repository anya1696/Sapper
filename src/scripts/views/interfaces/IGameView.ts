export default interface IGameView {
    loseGame(): void;

    closeGame(): void;

    pauseGame(): void;

    continueGame(): void;

    winGame(): void;

    onGameOpenTile(openedTileAmount: number): void

    onGameFlagChange(flagTileAmount: number): void
}