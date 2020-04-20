import * as PIXI from 'pixi.js';
import BaseButton from "./BaseButton";
import TextLabel from "../TextLabel";

export default class ButtonWithText extends PIXI.Container {
    textLabel: TextLabel | null = null;
    private button: BaseButton;
    private xCenterOffset: number = 0;
    private yCenterOffset: number = 0;

    constructor(texture: PIXI.Texture, text: string | undefined, style: PIXI.TextStyle | undefined) {
        super();

        this.button = new BaseButton(texture, undefined, undefined);
        this.addChild(this.button);

        this.addTextLabel(text, style);
    }

    addTextLabel(text: string | undefined, style: PIXI.TextStyle | undefined) {
        text = text || "";
        let textLabel = new TextLabel(text, style);
        this.textLabel = textLabel;
        this.toCenterText();
        this.addChild(textLabel);
    }

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

    toCenterText(): void {
        let textLabel = this.textLabel;
        if (!textLabel)
            return;
        textLabel.position.set(
            (-textLabel.width) / 2 + this.xCenterOffset,
            (-textLabel.height) / 2 + this.yCenterOffset);
    }

    addClickHandler(callback: () => void): void {
        // Специально клик только по кнопке, а не по кнопке и выезжающему за ее пределы тесту
        this.button.on('click', callback)
    }
}