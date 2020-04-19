import ButtonWithText from "../../elements/buttons/ButtonWithText";
import LoaderManager from "../../managers/LoaderManager";

const  STYLE = undefined;

export default class PauseButton extends ButtonWithText{

    constructor(text: string){
        super(LoaderManager.instance.getResourcesByName("pauseButton").texture, text, STYLE);
    }
}