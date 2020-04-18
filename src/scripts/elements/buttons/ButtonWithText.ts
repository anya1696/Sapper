import * as PIXI from 'pixi.js';
import BaseButton from "./BaseButton";
import TextLabel from "../TextLabel";

export default class ButtonWithText extends PIXI.Container {
    textLabel: TextLabel | null = null;
    private button: BaseButton;
    private xCenterOffset: int = 0;
    private yCenterOffset: int = 0;

    constructor(texture: PIXI.Texture, text: string | undefined, style: PIXI.TextStyle | undefined) {
        super();
        this.button = new BaseButton(texture, undefined, undefined);
        this.addChild(this.button);
        this.createTextLabel(text, style);
    }

    createTextLabel(text: string | undefined, style: PIXI.TextStyle | undefined): void {
        text = text || "";
        let textLabel = new TextLabel(text, style);
        this.textLabel = textLabel;
        this.toCenterText();
        this.addChild(textLabel);
    }

    setTextCenterPositionOffset(xOffset: int | undefined, yOffset: int | undefined): void {
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

    toCenterText(): void {
        let textLabel = this.textLabel;
        if (!textLabel)
            return;
        textLabel.position.set(
            (this.button.width - textLabel.width) / 2 + this.xCenterOffset,
            (this.button.height - textLabel.height) / 2 + this.yCenterOffset);
    }

    onClick(callBack: any): void {
        // Специально клик только по кнопке, а не по кнопке и его тесту
        this.button.on('click', callBack)
    }
}