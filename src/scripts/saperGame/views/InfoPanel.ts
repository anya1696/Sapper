import TextLabel from "../../elements/TextLabel";
import * as PIXI from "pixi.js";
import SapperGameModel from "../models/SapperGameModel";

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

    constructor() {
        super();
        this.openCounter = this.getCounterOpenTiles();
        this.addChild(this.openCounter);
        this.updateAllTiles(SapperGameModel.instance.getAllNumberTiles());

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
        let counter = new TextLabel("flags left: ", undefined);
        counter.position.set(params.x, params.y);
        return counter;
    }

    updateCounterText(): void {
        this.openCounter.setText(this.openedTiles + " / " + this.allTiles);
    }

    updateFlagCounterText(): void {
        this.flagedCounter.setText("flags left: " + this.flagedTiles);
    }

    updateOpenTiles(currentOpenTiles: int): void {
        this.openedTiles = currentOpenTiles;
        this.updateCounterText();
    }

    updateFlagTiles(flagedTiles: int): void {
        this.flagedTiles = flagedTiles;
        this.updateFlagCounterText();
    }

    updateAllTiles(allTiles: int): void {
        this.allTiles = allTiles;
        this.updateCounterText();
    }

}