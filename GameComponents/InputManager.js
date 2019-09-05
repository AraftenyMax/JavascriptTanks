import {keyEvent} from "../KeyboardSettings";

class InputManager {
    constructor(element=document) {
        this.subscribers = [];
        this.element = element;
        this.modes = {
            singleScreen: 0,
            manyScreens: 1
        };
        this.mode = this.modes.singleScreen;
        this.notifyCallback = (...args) => this.notify(...args);
        this.addEventHandler();
    }

    subscribeOnInputEvent(handler) {
        if (this.subscribers.includes(handler)) {
            throw new Error('Attempt to subscribe on event handler, which already is present');
        }
        this.subscribers.push(handler);
    }

    unsubscribeInputEvent(handler) {
        if (this.subscribers.includes(handler)) {
            let handlerIndex = this.subscribers.findIndex((subscriber) => subscriber === handler);
            this.subscribers.splice(handlerIndex, 1);
        }
    }

    notify(event) {
        for (let handler of this.subscribers) {
            handler(event);
        }
    }

    addEventHandler() {
        this.element.addEventListener(keyEvent, this.notifyCallback);
    }

    removeEventHandler() {
        this.element.addEventListener(keyEvent, this.notifyCallback);
    }

    switchMode(mode) {
        if (!Object.values(this.modes).includes(mode)) {
            throw new Error('Unknown mode is set to InputManager.');
        }
        this.mode = mode;
    }

    registerScreen(newHandler) {
        if (!newHandler) {
            throw new Error('New handler is null.');
        }
        if (this.mode === this.modes.singleScreen) {
            let
        }
        this.subscribeOnInputEvent(newHandler);
    }
}

export default InputManager;