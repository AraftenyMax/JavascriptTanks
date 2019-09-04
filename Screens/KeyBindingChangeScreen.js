import Screen from "./Screen";
import {screenNames} from "../Configuration";

class KeyBindingChangeScreen extends Screen {
    name = screenNames.keyBindingChangeScreen;
    get name() {
        return screenNames.keyBindingChangeScreen;
    }
}

export default KeyBindingChangeScreen;