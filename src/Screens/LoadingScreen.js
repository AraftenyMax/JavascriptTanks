import Screen from './Screen';
import {screenNames, defaultWindowWidth, defaultWindowHeight, serviceNames} from "../Configuration/Configuration";
import {keyEvent} from "../Configuration/KeyboardSettings";

class LoadingScreen extends Screen {
    static type = screenNames.loadingScreen;
    static preferredWidth = defaultWindowWidth;
    static preferredHeight = defaultWindowHeight;
    static dependencies = [serviceNames.keyboardService];
    constructor(dependencies, name, ...args) {
        super(name, ...args);
        this.container = null;
        this.isReady = false;
        this.msgDOMElement = null;
        this.keyboardService = dependencies[serviceNames.keyboardService];
        this.inputHandler = (...args) => this.dispatchKeyEvents(...args);
        this.texts = {
            loading: 'Loading...',
            ready: 'Ready. Press space to continue.'
        };
        this.keyCodeEvents = {
            space: this.keyboardService.getKeyCodeByName('Space')
        };
    }

    spaceHandler() {
        console.log('Space is hit');
        if (this.isReady) {
            let currentScreenInfo = this.screenInfo;
            let nextScreenInfo = {
                name: screenNames.menuScreen,
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

    dispose() {
        super.dispose();
    }
}

export default LoadingScreen;