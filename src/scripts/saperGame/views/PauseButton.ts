import BaseButton from "../../elements/buttons/BaseButton";
import * as PIXI from "pixi.js";

export default class PauseButton extends BaseButton{
    //TODO возможно запихать все в конструктор
    static textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/64/000000/hand.png");
    static textureButtonDown = PIXI.Texture.from("https://img.icons8.com/nolan/64/hand.png");
    static textureButtonOver = PIXI.Texture.from("https://img.icons8.com/dotty/80/000000/hand.png");

    constructor(){
        super(PauseButton.textureButton, PauseButton.textureButtonDown, PauseButton.textureButtonOver);
    }

    onClick(){

    }
}