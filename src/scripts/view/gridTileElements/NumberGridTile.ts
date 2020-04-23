import BaseGridTile from "./BaseGridTile";
import SapperGameController from "../../controller/SapperGameController";
import ResourceManager from "../managers/ResourceManager";

const textures = [
    "number_0",
    "number_1",
    "number_2",
    "number_3",
    "number_4",
    "number_5",
    "number_6",
    "number_7",
    "number_8"
];

export default class NumberGridTile extends BaseGridTile {
    get number(): number {
        return this._number;
    }

    private _number: number;

    /**
     * Создает иконку-число
     * @param number числовое значение иконки
     * @param colNumber номер колонки, в которой иконка будет находиться
     * @param rowNumber номер строки, в которой иконка будет находиться
     */
    constructor(number: number, colNumber: number, rowNumber: number) {
        super(ResourceManager.instance.getTextureByName(textures[number]), colNumber, rowNumber);
        this._number = number;
    }

    /**
     * Поведение при клике
     */
    onClick(): void {
        SapperGameController.instance.onTileClick(this);
        super.onClick();
    }

    /**
     * Показывает должен ли тайл провоцировать рекурсивное открытие
     * @returns {boolean} true, если значение тайла = 0 и на тайле нет флага
     */
    shouldProvokeRecursive(): boolean {
        return this.number === 0 && !this.fsm.is("flagged");
    }

}