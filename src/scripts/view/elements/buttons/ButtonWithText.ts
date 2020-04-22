import * as PIXI from 'pixi.js';
import BaseButton from "./BaseButton";
import TextLabel from "../TextLabel";

export default class ButtonWithText extends PIXI.Container {
    textLabel: TextLabel | null = null;
    private button: BaseButton;
    private xCenterOffset: number = 0;
    private yCenterOffset: number = 0;

    constructor(textureName: string, text: string | undefined, style: PIXI.TextStyle | undefined) {
        super();

        this.button = new BaseButton(textureName, undefined, undefined);
        this.addChild(this.button);

        this.addTextLabel(text, style);
    }

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
     * @param {() => void} callback колбек, который вызовется после клика по кнопке
     */
    addClickHandler(callback: () => void): void {
        this.button.on('click', callback)
    }
}