import Screen from './Screen';
import {SCREENS, defaultWindowWidth, defaultWindowHeight, SERVICES} from "../Configuration/Configuration";

class LoadingScreen extends Screen {
    static type = SCREENS.loadingScreen;
    static preferredWidth = defaultWindowWidth;
    static preferredHeight = defaultWindowHeight;
    constructor(serviceLocator, name, ...args) {
        super(name, ...args);
        this.screenManager = serviceLocator.getService(SERVICES.screenManager);
        this.keyboardService = serviceLocator.getService(SERVICES.keyboardService);
        this.keyCodeEvents = {
            space: this.keyboardService.getKeyCodeByName('Space'),
        };
        this.container = null;
        this.isReady = false;
        this.msgDOMElement = null;
        this.inputHandler = (...args) => this.dispatchKeyEvents(...args);
        this.texts = {
            loading: 'Loading...',
            ready: 'Ready. Press space to continue.'
        };
    }

    spaceHandler() {
        console.log('Space is hit');
        if (this.isReady) {
            let currentScreenInfo = this.screenInfo;
            let nextScreenInfo = {
                name: SCREENS.menuScreen,
                isModal: false
            };
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

    dispose() {
        super.dispose();
    }
}

export default LoadingScreen;