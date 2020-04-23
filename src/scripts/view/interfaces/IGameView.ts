/**
 * Интейфейс для игровой зоны
 */
export default interface IGameView {
    /**
     * Поведение игровой зоны при поражении
     */
    loseGame(): void;

    /**
     * закрыть игровое поле
     */
    closeGame(): void;

    /**
     * Поставить игрове поле на паузу
     */
    pauseGame(): void;

    /**
     * Снять игровое поле с паузы
     */
    continueGame(): void;

    /**
     * Поведение игровой зоны при победе
     */
    winGame(): void;
}