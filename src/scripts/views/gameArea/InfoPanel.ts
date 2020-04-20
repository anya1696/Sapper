import TextLabel from "../elements/TextLabel";
import * as PIXI from "pixi.js";
import SapperGameController from "../../conrollers/SapperGameController";
import {TweenLite} from "gsap";

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
    private updateCounterTextTween: gsap.TweenLite | null = null;

    constructor() {
        super();
        this.openCounter = this.getCounterOpenTiles();
        this.addChild(this.openCounter);
        this.updateAllTiles(SapperGameController.instance.getAllNumberTiles());
        this.flagedCounter = this.getCounterFlagedTiles();
        this.addChild(this.flagedCounter);
    }

    getCounterOpenTiles(): TextLabel {
        const params = this.OPEN;
        let counter = new TextLabel(" _ / _", undefined);
        counter.position.set(params.x, params.y);
        return counter;
    }

    getCounterFlagedTiles(): TextLabel {
        const params = this.FLAG;
        let counter = new TextLabel("flags left: " + SapperGameController.instance.getBombAmount(), undefined);
        counter.position.set(params.x, params.y);
        return counter;
    }

    updateCounterText(): void {
        if (this.updateCounterTextTween)
            this.updateCounterTextTween.kill();
        this.updateCounterTextTween = TweenLite.to(this, 0.7, {
            shownOpenedTile: this.openedTiles, onUpdate: () => {
                console.log(this.shownOpenedTile);
                this.openCounter.setText(Math.ceil(this.shownOpenedTile) + " / " + this.allTiles);
            }
        })
    }

    updateFlagCounterText(): void {
        this.flagedCounter.setText("flags left: " + this.flagedTiles);
    }

    updateOpenTiles(currentOpenTiles: number): void {
        this.openedTiles = currentOpenTiles;
        this.updateCounterText();
    }

    updateFlagTiles(flagedTiles: number): void {
        this.flagedTiles = flagedTiles;
        this.updateFlagCounterText();
    }

    updateAllTiles(allTiles: number): void {
        this.allTiles = allTiles;
        this.updateCounterText();
    }

}