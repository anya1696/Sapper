import * as PIXI from "pixi.js";
import config from "../../config/config.json";

export default class LoadManager {
    loader: PIXI.Loader = new PIXI.Loader();
    sprites: any = {};
    onBaseLoadCallback: (() => void) | null = null;

    static instance: LoadManager;

    constructor() {

    }

    addToLoader(alias: string, src: string) {
        this.loader.add(alias, src);
    }

    addResourcesToLoadFromConfig() {
        const tilesTextures: Record<string, string> = config.tilesTextures;
        for (const tileTexture in tilesTextures) {
            const scr = tilesTextures[tileTexture];
            this.addToLoader(tileTexture, scr);
        }
    }

    // @ts-ignore
    startLoad() {
        this.loader.load((loader: PIXI.Loader, resources: any) => {
                this.onLoadEnd(loader, resources);
                if (this.onBaseLoadCallback)
                    this.onBaseLoadCallback();
            }
        );
    }

    // @ts-ignore
    onLoadEnd(loader: PIXI.Loader, resources: any) {
        for (const resourceName in resources) {
            const resource = resources[resourceName];
            this.sprites[resourceName] = resource;
        }
        console.log(resources);
    }

    setLoadCallback(callback: () => void) {
        this.onBaseLoadCallback = callback;
    }

    getResourcesByName(name: string) {
        return this.sprites[name];
    }

}
