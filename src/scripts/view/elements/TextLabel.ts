import * as PIXI from 'pixi.js';

/**
 * Класс базового лейбла
 */
export default class TextLabel extends PIXI.Container {
    textElement: PIXI.Text;

    DEFAULT_STYLE = new PIXI.TextStyle({
        fontSize: 30
    });

    /**
     * Создание лейбла
     * @param text тест
     * @param style стиль текста, если указать undefined, будет базовый стиль из TextLabel
     */
    constructor(text: string, style: PIXI.TextStyle | undefined) {
        super();
        if (!style) style = this.DEFAULT_STYLE;
        this.textElement = new PIXI.Text(text, style);
        this.addChild(this.textElement);
    }

    setText(text: string): void {
        this.textElement.text = text;
    }
}