import BaseButton from "../elements/buttons/BaseButton";
import SapperGameModel from "../saperGame/models/SapperGameModel";
import SapperGameArea from "../saperGame/views/SapperGameArea";
import * as PIXI from 'pixi.js';

export interface IDialog {
        show(): void;
}

const PLAY_BUTTON = {
  x: 200,
  y: 200
};

export default class MainMenuScreen extends PIXI.Container{

    //pauseScreen: IDialog;

    constructor(){
        super();
        this.createPlayButton();
    }

    createPlayButton(){
        const textureButton = PIXI.Texture.from("https://img.icons8.com/dusk/256/000000/refresh.png");
        //const textureButtonDown = PIXI.Texture.from("https://img.icons8.com/wired/256/000000/refresh.png");
        //const textureButtonOver = PIXI.Texture.from("https://img.icons8.com/nolan/256/restart.png");
        //const playButton = new BaseButton(textureButton, textureButtonDown, textureButtonOver);
        const playButton = new BaseButton(textureButton, undefined, undefined);
        playButton.position.set(PLAY_BUTTON.x, PLAY_BUTTON.y);
        playButton.on('click', this.onPlayButtonClick.bind(this));
        this.addChild(playButton)
    }

    onPlayButtonClick(){
        SapperGameModel.instance = new SapperGameModel(10, 10, 10 );
        let gameArea = new SapperGameArea(SapperGameModel.instance.gameMatrix);
        SapperGameModel.instance.registerGameView(gameArea);
        this.addChild(gameArea);
    }


}