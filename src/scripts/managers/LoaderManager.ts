import * as PIXI from "pixi.js";
import config from "../config/config.json";

export default class LoaderManager {
    loader: PIXI.Loader = new PIXI.Loader();
    sprites: any = {};

    static instance: LoaderManager;

    constructor(){

    }

    addToLoader(alias: string, src: string){
        this.loader.add(alias, src);
    }

    addResourcesToLoadFromConfig(){
        const tilesTextures: Record<string, string> = config.tilesTextures;
        for (const tileTexture in tilesTextures){
            const scr = tilesTextures[tileTexture];
            this.addToLoader(tileTexture, scr);
        }
    }

    startLoad(){
        this.loader.load(this.onLoadEnd.bind(this));
    }

    // @ts-ignore
    onLoadEnd(loader: PIXI.Loader, resources: any){
        for (const resourceName in resources) {
            const resource = resources[resourceName];
            this.sprites[resourceName] = resource;
        }
        console.log(resources);
    }

    getResourcesByName(name: string){
        return this.sprites[name];
    }

}
