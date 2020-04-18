export default interface IViewTile {
    shouldProvokeRecursive(): boolean;

    getRow(): int;

    getCol(): int;

    openTile(): void;

    isOpen(): boolean;
}