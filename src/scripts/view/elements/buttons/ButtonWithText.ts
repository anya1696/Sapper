import * as PIXI from 'pixi.js';
import BaseButton from "./BaseButton";
import TextLabel from "../TextLabel";

/**
 * Класс кнопки с текстом
 */
export default class ButtonWithText extends PIXI.Container {
    textLabel: TextLabel | null = null;
    private button: BaseButton;
    private xCenterOffset: number = 0;
    private yCenterOffset: number = 0;

    /**
     * Создание кнопки с текстом
     * @param textureName название тектуры, под которой она записана в ResourcesManager
     * @param text текст кнопки, если указать undefined, будет ""
     * @param style стили кнопки, если указать undefined, возьмется базовый стиль из TextLabel
     */
    constructor(textureName: string, text: string | undefined, style: PIXI.TextStyle | undefined) {
        super();

        this.button = new BaseButton(textureName, undefined, undefined);
        this.addChild(this.button);

        this.addTextLabel(text, style);
    }

    /**
     * Создать и добавить текст кнопки
     * @param text текст кнопки, если указать undefined, будет ""
     * @param style стили кнопки, если указать undefined, возьмется базовый стиль из TextLabel
     */
    addTextLabel(text: string | undefined, style: PIXI.TextStyle | undefined): void {
        text = text || "";
        let textLabel = new TextLabel(text, style);
        this.textLabel = textLabel;
        this.toCenterText();
        this.addChild(textLabel);
    }

    /**
     * Установка смещения текста для центровки
     * @param {number | undefined} xOffset смещение по х
     * @param {number | undefined} yOffset смещение по y
     */
    setTextCenterPositionOffset(xOffset: number | undefined, yOffset: number | undefined): void {
        if (xOffset !== undefined) this.xCenterOffset = xOffset;
        if (yOffset !== undefined) this.yCenterOffset = yOffset;
        if (!this.textLabel)
            return;
        this.toCenterText();
    }

    /**
     * Изменить текст кнопки
     * @param text новый текст кнопки
     */
    setText(text: string): void {
        if (!this.textLabel)
            return;
        this.textLabel.setText(text);
        this.toCenterText();
    }

    /**
     * Перестановка текста в середину кнопки
     */
    toCenterText(): void {
        let textLabel = this.textLabel;
        if (!textLabel)
            return;
        textLabel.position.set(
            (-textLabel.width) / 2 + this.xCenterOffset,
            (-textLabel.height) / 2 + this.yCenterOffset);
    }

    /**
     * Добавление обработчика на клик только по кнопке, а не по кнопке и выезжающему за ее пределы тесту
     * @param callback колбек, который вызовется после клика по кнопке
     */
    addClickHandler(callback: () => void): void {
        this.button.on('click', callback)
    }
}