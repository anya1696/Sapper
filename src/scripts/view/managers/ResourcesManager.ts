import * as PIXI from "pixi.js";
import config from "../../../config/config.json";
import LoaderResource = PIXI.LoaderResource;

export default class ResourcesManager {
    loader: PIXI.Loader = new PIXI.Loader();
    resources: Record<string, PIXI.Texture> = {};
    onBaseLoadCallback: (() => void) | null = null;

    static instance: ResourcesManager;

    constructor() {

    }

    addToLoader(alias: string, src: string): void {
        this.loader.add(alias, src);
    }

    /**
     * Добавление в лоад всех текстур указанных в конфиге
     */
    addResourcesToLoadFromConfig(): void {
        const tilesTextures: Record<string, string> = config.tilesTextures;
        for (const [name, src] of Object.entries(tilesTextures)) {
            this.addToLoader(name, src);
        }
    }

    startLoad(): void {
        this.loader.load((_loader: PIXI.Loader, resources: Partial<Record<string, LoaderResource>>) => {
                this.onLoadEnd(_loader, resources);
                if (this.onBaseLoadCallback)
                    this.onBaseLoadCallback();
            }
        );
    }

    onLoadEnd(_loader: PIXI.Loader, resources: Partial<Record<string, LoaderResource>>): void {
        for (const [name, resource] of Object.entries(resources)) {
            if (resource)
                this.resources[name] = resource.texture;
        }
    }

    saveGeneratedTextures(texture: PIXI.Texture, name: string){
        this.resources[name+"_generated"] = texture;
    }

    getGeneratedTextures(name: string): PIXI.Texture | undefined{
        if (this.resources[name+"_generated"])
            return this.resources[name+"_generated"];
        return undefined;
    }

    /**
     * Установить колбек, который  дополнительно вызовется после лоада
     * @param {() => void} callback
     */
    setLoadCallback(callback: () => void): void {
        this.onBaseLoadCallback = callback;
    }

    /**
     * Получить загруженный ресурс по названию
     * @param {name} name название, под которым был сохранен ресурс
     */
    getTextureByName(name: string): any {
        return this.resources[name];
    }

}
