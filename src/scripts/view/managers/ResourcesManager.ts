import * as PIXI from "pixi.js";
import config from "../../../config/config.json";
import LoaderResource = PIXI.LoaderResource;
/**
 * Ресурс менеджер
 */
export default class ResourcesManager {
    loader: PIXI.Loader = new PIXI.Loader();
    resources: Record<string, PIXI.Texture> = {};
    onBaseLoadCallback: (() => void) | null = null;

    static instance: ResourcesManager;

    /**
     * Создать ресурс менеджер
     */
    constructor() {

    }

    /**
     * Добавить один ресурс в загрузку до начала загрузки
     * @param alias имя, под которым ресурс будет записан
     * @param src url по которому ресурс будет скачен
     */
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

    /**
     * Начать загрузку ресурсов, вызывать после добавления всех ресурсов
     */
    startLoad(): void {
        this.loader.load((_loader: PIXI.Loader, resources: Partial<Record<string, LoaderResource>>) => {
                this.onLoadEnd(_loader, resources);
                if (this.onBaseLoadCallback)
                    this.onBaseLoadCallback();
            }
        );
    }

    /**
     * Колбек на завершения загрузки (запись ресурсов в ResourcesManager)
     * @param _loader лоадер который закончил грузиться
     * @param resources все загруженные этим лоадером ресурсы
     */
    onLoadEnd(_loader: PIXI.Loader, resources: Partial<Record<string, LoaderResource>>): void {
        for (const [name, resource] of Object.entries(resources)) {
            if (resource)
                this.resources[name] = resource.texture;
        }
    }

    /**
     * Сохранить сгенерированную текстуру
     * @param texture сгнерированная текстура
     * @param name имя под которым оно будет записано, и к ней добвится постфикс на всякий
     */
    saveGeneratedTextures(texture: PIXI.Texture, name: string){
        this.resources[name+"_generated"] = texture;
    }

    /**
     * Получить сгенерированную текстуру
     * @param name имя текстуры, и к ней добвится постфикс на всякий
     * @returns {PIXI.Texture | undefined} Возвращает текстуру если она есть, и undefined в обратном случае
     */
    getGeneratedTextures(name: string): PIXI.Texture | undefined{
        if (this.resources[name+"_generated"])
            return this.resources[name+"_generated"];
        return undefined;
    }

    /**
     * Установить колбек, который  дополнительно вызовется после лоада
     * @param callback
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
