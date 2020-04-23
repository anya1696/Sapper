import * as PIXI from 'pixi.js';
import IDialog from "../interfaces/IDialog";
import {TweenLite} from "gsap";
import {APP_HEIGHT, APP_WIDTH} from "../../app";

/**
 * Класс базового окна
 */
export default class BaseDialog extends PIXI.Container implements IDialog {
    private background: PIXI.Sprite;

    DEFAULT_SHADOW = {
        width: APP_WIDTH,
        height: APP_HEIGHT,
        tint: 0x000000,
        alpha: 0.6
    };

    /**
     * Создать базовое окно
     */
    constructor() {
        super();
        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.visible = false;
        this.addChild(this.background);
    }

    /**
     * Залить и показать темную подложку
     */
    createShadow(): void {
        const params = this.DEFAULT_SHADOW;
        this.background.visible = true;
        this.background.width = params.width;
        this.background.height = params.height;
        this.background.tint = params.tint;
        this.background.alpha = params.alpha;
        this.background.interactive = true;
    }

    /**
     * Анимированно показать окно
     */
    show(): void {
        TweenLite.fromTo(this.scale, 2, {x: 0, y: 0}, {x: 1, y: 1, ease: "elastic.out(1, 0.5)"})
    }

    /**
     * Анимированно закрыть окно
     */
    close(): void {
        TweenLite.to(this.scale, 2, {
            x: 0, y: 0, ease: "elastic.out(1, 0.5)", onComplete: () => {
                this.destroy();
            }
        });
    }
}