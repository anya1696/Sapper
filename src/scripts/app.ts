import * as PIXI from 'pixi.js'
import { FpsMeter } from './fps-meter';
import MainMenuScreen from "./mainMenu/MainMenuScreen";

window.PIXI = PIXI;

interface EngineParams {
    containerId: string,
    canvasW: number,
    canvasH: number,
    fpsMax: number
}

let _renderer: PIXI.Renderer;

class Engine {
    public container: HTMLElement;
    public loader: PIXI.Loader;
    public renderer: PIXI.Renderer;
    public stage: PIXI.Container;
    public graphics: PIXI.Graphics;
    public fpsMax: number;

    constructor(params: EngineParams) {
        this.loader = PIXI.Loader.shared;
        this.renderer = PIXI.autoDetectRenderer({
            width: params.canvasW,
            height: params.canvasH,
            antialias: true
        });
        //TODO проверить
        _renderer = this.renderer;
        this.stage = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.fpsMax = params.fpsMax;

        this.stage.on("mousedown", (e:any) => { console.log('stage', e.originalEvent.button, e.originalEvent) });

        this.container = params.containerId ? document.getElementById(params.containerId) || document.body : document.body;
        this.container.appendChild(this.renderer.view);
    }
}

export const APP_WIDTH = 800;
export const APP_HEIGHT = 450;

const engine = new Engine({
    containerId: 'game',
    canvasW: APP_WIDTH,
    canvasH: APP_HEIGHT,
    fpsMax: 60
});

// @ts-ignore
// Отключение контекстного меню для нормальной обработки райтклика
window.document.body.oncontextmenu = function(e) {
    e.preventDefault();
};

let fpsMeter: FpsMeter;

const src = "https://i.imgur.com/s4qgg9s.jpg";
const sprite = PIXI.Sprite.from(src);

window.onload = load;

function load() {
    create();
}

function create() {

    sprite.anchor.set(0.5);
    sprite.width = engine.renderer.width;
    sprite.height = engine.renderer.height;
    sprite.x = engine.renderer.width / 2;
    sprite.y = engine.renderer.height / 2;
    engine.stage.addChild(sprite);

    /* FPS */
    const fpsMeterItem = document.createElement('div');
    fpsMeterItem.classList.add('fps');
    engine.container.appendChild(fpsMeterItem);

    fpsMeter = new FpsMeter(() => {
        fpsMeterItem.innerHTML = 'FPS: ' + fpsMeter.getFrameRate().toFixed(2).toString();
    });

    let mainMenuScreen = new MainMenuScreen();
    engine.stage.addChild(mainMenuScreen);

    setInterval(update, 1000.0 / engine.fpsMax);
    render();
}

function update() {
    fpsMeter.updateTime();
}

function render() {
    requestAnimationFrame(render);
    engine.renderer.render(engine.stage);
    fpsMeter.tick();
}
//$("canvas")[0].onmousedown = function(e){ if (e.button == 2) console.log("right"); };

// function disableContextMenu(canvas: any) {
//     canvas.addEventListener('contextmenu', (e) => {
//         e.preventDefault();
//     });
// }

export function spriteToTexture(obj: PIXI.Sprite) {
    let container = new PIXI.Container();
    container.addChild(obj);
    const texture = _renderer.generateTexture(container, 1, 1, new PIXI.Rectangle(0,0,100, 100));

    return texture;
}
