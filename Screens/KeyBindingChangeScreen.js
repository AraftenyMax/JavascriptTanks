import Screen from "./Screen";
import {screenNames, defaultModalHeight, defaultModalWidth} from "../Configuration";
import {KeyboardScheme, GameKeyCodes} from "../KeyboardSettings";

class KeyBindingChangeScreen extends Screen {
    static type = screenNames.keyBindingChangeScreen;
    constructor(resourceManager, sendIntent, moveNext, width=defaultModalWidth, height=defaultModalHeight, ...args) {
        super(resourceManager, sendIntent, moveNext, width, height);
        this.container = null;
        this.messages = {
            waitingForInput: 'Hit key which you want to assign to this action.',
            waitingForPrompt: 'The hit key is '
        };
        this.currentKey = {
            code: args[0].keyCode,
            respondsFor: GameKeyCodes[this.code],
            keyName: KeyboardScheme[this.code]
        };
        this.nextKey = {
            code: null,
            respondsFor: this.currentKey.respondsFor,
            keyName: null
        };
        this.states = {
            waitingForInput: 'waitingforinput',
            waitingForPrompt: 'waitingforprompt',
        };
        this.currentState = this.states.waitingForInput;
    }

    getRender() {
        if (!this.container) {
            this.container = document.createElement('div');

        }
    }

    get name() {
        return screenNames.keyBindingChangeScreen;
    }
}

export default KeyBindingChangeScreen;