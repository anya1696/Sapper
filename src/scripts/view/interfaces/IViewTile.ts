export default interface IViewTile {
    shouldProvokeRecursive(): boolean;

    getRow(): number;

    getCol(): number;

    openTile(): void;

    isOpen(): boolean;
}