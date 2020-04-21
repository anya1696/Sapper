import ButtonWithText from "../elements/buttons/ButtonWithText";
import LoadManager from "../../managers/LoadManager";

const  STYLE = undefined;

export default class PauseButton extends ButtonWithText{

    constructor(text: string){
        super(LoadManager.instance.getResourcesByName("pauseButton").texture, text, STYLE);
    }
}