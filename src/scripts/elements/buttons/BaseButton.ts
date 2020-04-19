import * as PIXI from 'pixi.js';
import {spriteToTexture} from "../../app";

export default class BaseButton extends PIXI.Sprite {
    TINTS = {
        over: 0xEEEEEE,
        down:0x999999
    };

    textureButton: PIXI.Texture;
    textureButtonDown: PIXI.Texture;
    textureButtonOver: PIXI.Texture;

    private isDown: boolean = false;
    private isOver: boolean = false;

    constructor(textureButton: PIXI.Texture, textureButtonDown: PIXI.Texture | undefined, textureButtonOver: PIXI.Texture | undefined) {
        super(textureButton);
        this.textureButton = textureButton;

        this.textureButtonDown = textureButtonDown ? textureButtonDown : this.generateDownTexture();
        this.textureButtonOver = textureButtonOver ? textureButtonOver : this.generateOverTexture();

        this.anchor.set(0.5);
        this.buttonMode = true;
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);
    }

    onButtonDown(): void {
        this.isDown = true;
        this.texture = this.textureButtonDown;
        this.alpha = 1;
    }

    onButtonUp(): void {
        this.isDown = false;
        if (this.isOver) {
            this.texture = this.textureButtonOver;
        }
        else {
            this.texture = this.textureButton;
        }
    }

    onButtonOver(): void {
        this.isOver = true;
        if (this.isDown) {
            return;
        }
        this.texture = this.textureButtonOver;
    }

    onButtonOut(): void {
        this.isOver = false;
        if (this.isDown) {
            return;
        }
        this.texture = this.textureButton;
    }

    generateDownTexture(){
        let textureButtonDown = PIXI.Sprite.from(this.textureButton);
        textureButtonDown.tint = this.TINTS.down;

        //TODO починить
        return this.textureButton;
        return spriteToTexture(textureButtonDown);
    }

    generateOverTexture(){
        let textureButtonOver = PIXI.Sprite.from(this.textureButton);
        textureButtonOver.tint = this.TINTS.over;

        //TODO починить
        return this.textureButton;
        return spriteToTexture(textureButtonOver);
    }

}
