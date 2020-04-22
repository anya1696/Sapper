/**
 * Интерфейс для тайлов
 */
export default interface IViewTile {
    /**
     * Должен ли тайл провоцировать рекурсивное открытие ближайших тайлов
     */
    shouldProvokeRecursive(): boolean;

    /**
     * Получить номер строки тайла
     */
    getRow(): number;

    /**
     * Получить номер колонки тайла
     */
    getCol(): number;

    /**
     * Открыть тайл
     */
    openTile(): void;

    /**
     * Показывает открыт ли тайл
     */
    isOpen(): boolean;
}