/**
 * Интефейс для диалогов
 */
export default interface IDialog {
    /**
     * Показать диалог
     */
    show(): void;

    /**
     * Скрыть диалог
     */
    close(): void;
}