import Screen from "./Screen";
import {screenNames, defaultModalHeight, defaultModalWidth, modalWindowClass} from "../Configuration/Configuration";
import KeyboardManagerInstance from "../Services/KeyboardService";

class KeyBindingChangeScreen extends Screen {
    static type = screenNames.keyBindingChangeScreen;
    static preferredWidth = defaultModalWidth;
    static preferredHeight = defaultModalHeight;

    constructor(resourceManager, sendIntent, moveNext, fallBack,
                name, width, height, ...args) {
        super(resourceManager, sendIntent, moveNext, fallBack, name, width, height);
        this.container = null;
        this.pressedKeyElement = null;
        this.msgAvailElem = null;
        this.messages = {
            actionDescription: 'Press any key to bind it to action: ',
            keyDescription: 'Now this action is present by: ',
            pressedKey: 'Pressed key: ',
            keyIsNotAvailable: 'Key is not available.',
            keyIsFree: 'Pressed key is free. Press enter to continue.',
            keyIsBound: 'Pressed key is already bound to action: ',
            waitingForInput: 'Waiting for input...'
        };
        this.states = {
            waitingForInput: 0,
            waitingForSuccessPrompt: 1,
        };
        this.keyCodes = {
            enter: KeyboardManagerInstance.getKeyCodeByName('Enter'),
            escape: KeyboardManagerInstance.getKeyCodeByName('Escape')
        };
        let currentKeyCode = args[0].code;
        this.currentKeyInfo = this.getKeyInfo(currentKeyCode);
        this.nextKey = null;
        this._state = this.states.waitingForInput;
        this.inputHandler = (...args) => this.dispatchKeyEvents(...args);
    }

    changeState(state, ...args) {
        if (!Object.values(this.states).includes(state)) {
            throw new Error('Attempt to set unknown state');
        }
        switch (state) {
            case this.states.waitingForInput: {
                this.pressedKeyElement.innerText = this.messages.pressedKey;
                this.msgAvailElem.innerText = this.messages.waitingForInput;
                this.nextKey = null;
                break;
            }
            case this.states.waitingForSuccessPrompt: {
                let {code: keyCode} = args[0];
                let {name: keyName} = KeyboardManagerInstance.getKeyInfoByCode(keyCode);
                this.pressedKeyElement.innerText = this.messages.pressedKey + keyName;
                this.msgAvailElem.innerText = this.messages.keyIsFree;
                this.nextKey = keyCode;
            }
        }
        this._state = state;
    }

    waitingForInputHandler(keyCode) {
        if (!KeyboardManagerInstance.isKeyFree(keyCode)) {
            if (!KeyboardManagerInstance.isKeyAvailableForBind(keyCode)) {
                this.msgAvailElem.innerText = this.messages.keyIsNotAvailable;
            }
            if (KeyboardManagerInstance.isKeyAlreadyBound(keyCode)) {
                let {action} = KeyboardManagerInstance.getActionKeyInfoByCode(keyCode);
                let {name} = KeyboardManagerInstance.getKeyInfoByCode(keyCode);
                this.pressedKeyElement.innerText = this.messages.pressedKey + name;
                this.msgAvailElem.innerText = this.messages.keyIsBound + action;
            }
            return;
        }
        let payload = {code: keyCode};
        this.changeState(this.states.waitingForSuccessPrompt, payload);
    }

    enterHandler() {
        KeyboardManagerInstance.bindKeyToAction(this.currentKeyInfo.name, this.nextKey);
        let currentScreenInfo = this.currentKeyInfo;
        let nextScreenInfo = null;
        this.fallBack(currentScreenInfo);
    }

    escapeHandler() {
        this.changeState(this.states.waitingForInput);
    }

    waitingForPromptHandler(keyCode) {
        switch (keyCode) {
            case this.keyCodes.enter:
                this.enterHandler();
                break;
            case this.keyCodes.escape:
                this.escapeHandler();
                break;
        }
    }

    dispatchKeyEvents(event) {
        let {keyCode} = event;
        switch (this._state) {
            case this.states.waitingForInput: {
                this.waitingForInputHandler(keyCode);
                break;
            }
            case this.states.waitingForSuccessPrompt: {
                this.waitingForPromptHandler(keyCode);
                break;
            }
        }
    }

    getKeyInfo(keyCode) {
        let {action, name} = KeyboardManagerInstance.getActionKeyInfoByCode(keyCode);
        let {name:keyName} = KeyboardManagerInstance.getKeyInfoByCode(keyCode);
        return {
            keyCode: keyCode,
            keyName: keyName,
            action: action,
            name: name
        };
    }

    getKeyInfoElement() {
        let keyActionText = this.currentKeyInfo.action;
        let keyActionElement = document.createElement('p');
        keyActionElement.innerText = this.messages.actionDescription + keyActionText;
        return keyActionElement;
    }

    getKeyDescription() {
        let keyName = this.currentKeyInfo.keyName;
        let keyNameElement = document.createElement('p');
        keyNameElement.innerText = this.messages.keyDescription + keyName;
        return keyNameElement;
    }

    configureKeyAvailMsgElem() {
        this.msgAvailElem = document.createElement('p');
        this.msgAvailElem.innerText = this.messages.waitingForInput;
    }

    configurePressedKeyElem() {
        this.pressedKeyElement = document.createElement('p');
        this.pressedKeyElement.innerText = this.messages.pressedKey;
    }

    configureContainer() {
        this.container = document.createElement('div');
        this.container.classList.add(modalWindowClass);
        this.container.style.width = this.width + 'px';
        this.container.style.height = this.height + 'px';
    }

    getRender() {
        if (!this.container) {
            this.configureContainer();
            let keyAction = this.getKeyInfoElement();
            let keyDescription = this.getKeyDescription();
            this.configurePressedKeyElem();
            this.configureKeyAvailMsgElem();
            this.container.append(keyAction);
            this.container.append(keyDescription);
            this.container.append(this.pressedKeyElement);
            this.container.append(this.msgAvailElem);
        }
        return this.container;
    }
}

export default KeyBindingChangeScreen;