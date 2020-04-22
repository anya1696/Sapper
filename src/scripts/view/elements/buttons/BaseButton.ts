import * as PIXI from 'pixi.js';
import {spriteToTexture} from "../../../app";
import ResourcesManager from "../../managers/ResourcesManager";

/**
 * Класс базовой кнопки
 */
export default class BaseButton extends PIXI.Sprite {
    TINTS = {
        over: 0xdddddd,
        down: 0x999999
    };

    textureButton: PIXI.Texture;
    textureButtonDown: PIXI.Texture;
    textureButtonOver: PIXI.Texture;

    private isDown: boolean = false;
    private isOver: boolean = false;
    private textureButtonBaseName: string;

    /**
     * Создние базовой кнопки. Все названия это имя, под которой текстуры записаны в ResourcesManager
     * @param textureButtonName название базовой текстуры
     * @param textureButtonDownName название тектуры при клике, если указать undefined, то тектура будет сильно затемненной базовой текстурой
     * @param textureButtonOverName название тектуры при наведении, если указать undefined, то тектура будет затемненной базовой текстурой
     */
    constructor(textureButtonName: string, textureButtonDownName: string | undefined, textureButtonOverName: string | undefined) {
        super(ResourcesManager.instance.getTextureByName(textureButtonName));
        this.textureButtonBaseName = textureButtonName;

        this.textureButton = ResourcesManager.instance.getTextureByName(textureButtonName);

        this.textureButtonDown = textureButtonDownName ? ResourcesManager.instance.getTextureByName(textureButtonDownName) : this.generateDownTexture();
        this.textureButtonOver = textureButtonOverName ? ResourcesManager.instance.getTextureByName(textureButtonOverName) : this.generateOverTexture();

        this.anchor.set(0.5);
        this.buttonMode = true;
        this.interactive = true;
        this.on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);
    }

    /**
     * Логика при pointerdown
     */
    onButtonDown(): void {
        this.isDown = true;
        this.texture = this.textureButtonDown;
        this.alpha = 1;
    }

    /**
     * Логика при pointerup, pointerupoutside
     */
    onButtonUp(): void {
        this.isDown = false;
        if (this.isOver) {
            this.texture = this.textureButtonOver;
        }
        else {
            this.texture = this.textureButton;
        }
    }

    /**
     * Логика при pointerover
     */
    onButtonOver(): void {
        this.isOver = true;
        if (this.isDown) {
            return;
        }
        this.texture = this.textureButtonOver;
    }

    /**
     * Логика при pointerout
     */
    onButtonOut(): void {
        this.isOver = false;
        if (this.isDown) {
            return;
        }
        this.texture = this.textureButton;
    }

    /**
     * Создание сильно затемненной базовой текстуры
     * @returns {PIXI.Texture} сильно затемненная базовая текстура
     */
    generateDownTexture() {
        let textureButtonDown = PIXI.Sprite.from(this.textureButton);
        textureButtonDown.tint = this.TINTS.down;

        return spriteToTexture(textureButtonDown, this.textureButtonBaseName + "Down");
    }

    /**
     * Создание затемненной базовой текстуры
     * @returns {PIXI.Texture} затемненная базовая текстура
     */
    generateOverTexture() {
        let textureButtonOver = PIXI.Sprite.from(this.textureButton);
        textureButtonOver.tint = this.TINTS.over;

        return spriteToTexture(textureButtonOver, this.textureButtonBaseName + "Over");
    }

}
