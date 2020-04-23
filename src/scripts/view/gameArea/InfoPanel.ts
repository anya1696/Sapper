import TextLabel from "../elements/TextLabel";
import * as PIXI from "pixi.js";
import SapperGameController from "../../controller/SapperGameController";
import {TweenLite} from "gsap";

/**
 * Класс поля информации об игре
 */
export default class InfoPanel extends PIXI.Container {
    private openCounter: TextLabel;
    private openedTiles: number = 0;
    private flagedTiles: number = 0;
    private allTiles: number = 0;
    private flagedCounter: TextLabel;

    FLAG = {
        x: 0,
        y: 0
    };

    OPEN = {
        x: 0,
        y: 100
    };

    private shownOpenedTile: number = 0;
    private updateCounterTextTween: any | null = null;

    /**
     * Создать поле информации об игре
     */
    constructor() {
        super();
        this.openCounter = this.getCounterOpenTiles();
        this.addChild(this.openCounter);
        this.updateAllTiles(SapperGameController.instance.getAllNumberTiles());
        this.flagedCounter = this.getCounterFlagedTiles();
        this.addChild(this.flagedCounter);
    }

    /**
     * Создать лейбла счетчика открытых тайлов
     * @returns {TextLabel} лейбл счетчика открытых тайлов
     */
    getCounterOpenTiles(): TextLabel {
        const params = this.OPEN;
        let counter = new TextLabel(" _ / _", undefined);
        counter.position.set(params.x, params.y);
        return counter;
    }

    /**
     * Создать лейбла счетчика флагов. Счетчик начинается с 10 и уменьшается
     * @returns {TextLabel} лейбл счетчика флагов
     */
    getCounterFlagedTiles(): TextLabel {
        const params = this.FLAG;
        let counter = new TextLabel("flags left: " + SapperGameController.instance.getBombAmount(), undefined);
        counter.position.set(params.x, params.y);
        return counter;
    }

    /**
     * Анимиция обновления текста лайбла счетчика открытых тайлов
     */
    updateCounterText(): void {
        if (this.updateCounterTextTween)
            this.updateCounterTextTween.kill();
        this.updateCounterTextTween = TweenLite.to(this, 0.7, {
            shownOpenedTile: this.openedTiles, onUpdate: () => {
                this.openCounter.setText(Math.ceil(this.shownOpenedTile) + " / " + this.allTiles);
            }
        })
    }

    /**
     * Обновить текст лайбла счетчика флагов
     */
    updateFlagCounterText(): void {
        this.flagedCounter.setText("flags left: " + this.flagedTiles);
    }

    /**
     * Обновить значение и текст лейбла счетчика открытых тайлов
     * @param currentOpenTiles новое значение открытых тайлов
     */
    updateOpenTiles(currentOpenTiles: number): void {
        this.openedTiles = currentOpenTiles;
        this.updateCounterText();
    }

    /**
     * Обновить значение и текст лейбла счетчика флагов
     * @param flaggedTiles
     */
    updateFlagTiles(flaggedTiles: number): void {
        this.flagedTiles = flaggedTiles;
        this.updateFlagCounterText();
    }

    /**
     * Обновить значение и текст лейбла общего числа безопасных тайлов
     * @param allTiles общее число безопасных тайлов
     */
    updateAllTiles(allTiles: number): void {
        this.allTiles = allTiles;
        this.updateCounterText();
    }

}