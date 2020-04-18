export default interface IGameView {
    loseGame(): void;

    closeGame(): void;

    pauseGame(): void;

    continueGame(): void;

    winGame(): void;

    onGameOpenTile(openedTileAmount: int): void

    onGameFlagChange(flagTileAmount: int): void
}