import {defaultWindowHeight, defaultWindowWidth, SCREENS} from "../Configuration/Configuration";
import KeyboardManagerInstance from "../Services/KeyboardManager";

class MissionSelectScreen extends Screen {
    static type = SCREENS.missionSelectScreen;
    static preferredWidth = defaultWindowWidth;
    static preferredHeight = defaultWindowHeight;
    constructor(ResourceManager, sendIntent, moveNext, fallBack, name, ...args) {
        super(ResourceManager, sendIntent, moveNext, fallBack, name, ...args);
        this.inputHandler = (...args) => this.dispatchKeyEvents(...args);
        this.keyCodes = {
            enter: KeyboardManagerInstance.getKeyCodeByName('Enter'),
            arrowUp: KeyboardManagerInstance.getKeyCodeByName('Arrow Up'),
            arrowDown: KeyboardManagerInstance.getKeyCodeByName('Arrow Down'),
            escape: KeyboardManagerInstance.getKeyCodeByName('Escape')
        };
        this.missions
    }

    enterHandler() {

    }

    arrowUpHandler() {

    }

    arrowDownHandler() {

    }

    escapeHandler() {

    }

    dispatchKeyEvents(event) {
        let { keyCode } = event;
        switch (keyCode) {

        }
    }

    getRender() {
        if (!this.container) {

        }
        return this.container;
    }

    dispose() {

    }
}

export default MissionSelectScreen;