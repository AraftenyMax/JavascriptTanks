import Screen from './Screen';
import {screenNames, keyEvent} from "../Configuration";

class LoadingScreen extends Screen {
    static name = screenNames.loadingScreen;
    constructor(resourceManager, sendIntent, moveNext, ...args) {
        super();
        this.sendIntent = sendIntent;
        this.moveNext = moveNext;
        this.container = null;
        this.isReady = false;
        this.msgDOMElement = null;
        this.dispatchKeyEvents = this.dispatchKeyEvents.bind(this);
        this.texts = {
            loading: 'Loading...',
            ready: 'Ready. Press space to continue.'
        };
        this.keyCodeEvents = {
            space: 32
        };
    }

    spaceHandler() {
        console.log('Space is hit');
        if (this.isReady) {
            let thisIsModal = this.isModal;
            let currentScreenInfo = {
                currentScreenName: screenNames.loadingScreen,
                isModal: thisIsModal
            };
            let nextScreenInfo = {
                nextScreenName: screenNames.menuScreen,
                isModal: false
            };
            this.moveNext(currentScreenInfo, nextScreenInfo);
        }
    }

    getRender() {
        if (!this.container) {
            this.msgDOMElement = document.createElement('h1');
            let text =  !!this.isReady ? this.texts.ready : this.texts.loading;
            this.msgDOMElement.innerText = text;
            this.container = document.createElement('div');
            this.container.append(this.msgDOMElement);
        }
        return this.container;
    }

    receiveIntent(from, args) {
        super.receiveIntent();
        let { isReady } = args;
        if (isReady) {
            this.isReady = isReady;
            this.msgDOMElement.innerText = this.texts.ready;
        }
    }

    dispatchKeyEvents(event) {
        let { keyCode } = event;
        switch (keyCode) {
            case this.keyCodeEvents.space: {
                if (this.isReady) {
                    this.spaceHandler();
                } else {
                    console.log('This is unavailable now');
                }
                break;
            }
            default: {
                console.log('Default');
            }
        }
    }

    bindOnKeyEvents() {
        document.addEventListener(keyEvent, this.dispatchKeyEvents);
    }

    removeEventsHandler() {
        document.removeEventListener(keyEvent, this.dispatchKeyEvents);
    }

    dispose() {
        super.dispose();
        this.removeEventsHandler();
    }

    get name() {
        return screenNames.loadingScreen;
    }
}

export default LoadingScreen;