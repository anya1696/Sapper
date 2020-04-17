import {IDialog} from "../mainMenu/MainMenuScreen";
import * as PIXI from 'pixi.js';

export default class BaseDialog extends PIXI.Container implements IDialog{
    private background: PIXI.Sprite;
    constructor(){
        super();
        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.visible = false;
        this.addChild(this.background);
    }

    createShadow(){
        this.background.visible = true;
        this.background.width = 500;
        this.background.height = 500;
        this.background.tint = 0x000000;
        this.background.alpha = 0.6;
    }

    show(): void {

    }

    close(){
        this.destroy();
    }
}