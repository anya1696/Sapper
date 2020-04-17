import * as PIXI from 'pixi.js';

export default class TextLabel extends PIXI.Container {
    textElement:PIXI.Text;

    DEFAULT_STYLE = new PIXI.TextStyle({
        fontSize: 30
    });

    constructor(text: string, style: PIXI.TextStyle | undefined){
        super();
        if (!style) style = this.DEFAULT_STYLE;
        this.textElement = new PIXI.Text(text, style);
        this.addChild(this.textElement);
    }
}