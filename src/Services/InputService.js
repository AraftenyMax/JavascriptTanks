import {keyEvent} from "../Configuration/KeyboardSettings";
import {serviceNames} from "../Configuration/Configuration";

class InputService {
    constructor(element=document) {
        this.subscribers = [];
        this.element = element;
        this.modes = {
            singleScreen: 0,
            manyScreens: 1
        };
        this.name = serviceNames.inputService;
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
        if (this.mode === this.modes.singleScreen) {
            this.subscribers[this.subscribers.length - 1](event);
            return;
        }
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
            throw new Error('Unknown mode is set to InputService.');
        }
        this.mode = mode;
    }

    registerScreen(handler) {
        if (!handler) {
            throw new Error('New handler is null.');
        }
        this.subscribeOnInputEvent(handler);
    }
}

export default InputService;