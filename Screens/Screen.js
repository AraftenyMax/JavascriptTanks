import {keyEvent} from "../KeyboardSettings";

class Screen {
    constructor(ResourceManager, sendIntent, moveNext, width, height) {
        this.width = width;
        this.height = height;
        this.isModal = false;
        this.isActive = false;
        this.ResourceManager = ResourceManager;
        this.sendIntent = sendIntent;
        this.moveNext = moveNext;
    }

    getRender() {

    }

    dispose() {

    }

    bindOnKeyEvents() {
        document.addEventListener(keyEvent, this.dispatchKeyEvents);
    }

    removeEventsHandler() {
        document.removeEventListener(keyEvent, this.dispatchKeyEvents);
    }

    dispatchKeyEvents() {

    }

    receiveIntent() {

    }

    get name() {

    }

    get screenInfo() {

    }
}

export default Screen;