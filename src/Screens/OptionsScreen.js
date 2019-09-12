import Screen from "./Screen";
import {selectedMenuItemClass, screenNames, defaultWindowWidth, defaultWindowHeight} from "../Configuration/Configuration";
import KeyboardManagerInstance from "../Services/KeyboardService";

class OptionsScreen extends Screen {
    static type = screenNames.optionsScreen;
    static preferredWidth = defaultWindowWidth;
    static preferredHeight = defaultWindowHeight;
    constructor(resourceManager, sendIntent, moveNext, fallBack, name, ...args) {
        super(resourceManager, sendIntent, moveNext, fallBack, name, ...args);
        this.container = null;
        this.inputHandler = (...args) => this.dispatchKeyEvents(...args);
        this.selectedItemIndex = 0;
        this.keyDescriptions = KeyboardManagerInstance.actionKeysInfo;
        this.menuDOMItems = [];
        this.keyCodes = {
            enter: KeyboardManagerInstance.getKeyCodeByName('Enter'),
            arrowUp: KeyboardManagerInstance.getKeyCodeByName('Arrow Up'),
            arrowDown: KeyboardManagerInstance.getKeyCodeByName('Arrow Down'),
            escape: KeyboardManagerInstance.getKeyCodeByName('Escape')
        };
    }

    selectItem(previousIndex, nextIndex) {
        this.menuDOMItems[previousIndex].classList.remove(selectedMenuItemClass);
        this.menuDOMItems[nextIndex].classList.add(selectedMenuItemClass);
    }

    escapeHandler() {
        let currentScreenInfo = this.screenInfo;
        let nextScreenInfo = {
            name: screenNames.menuScreen,
            isModal: false
        };
        this.moveNext(currentScreenInfo, nextScreenInfo);
    }

    arrowUpHandler() {
        if (this.selectedItemIndex === 0) {
            let nextItemIndex = this.menuDOMItems.length - 1;
            this.selectItem(this.selectedItemIndex, nextItemIndex);
            this.selectedItemIndex = nextItemIndex;
            return;
        }
        this.selectItem(this.selectedItemIndex, this.selectedItemIndex - 1);
        this.selectedItemIndex--;
    }

    arrowDownHandler() {
        if (this.selectedItemIndex === this.menuDOMItems.length - 1) {
            let nextItemIndex = 0;
            this.selectItem(this.selectedItemIndex, nextItemIndex);
            this.selectedItemIndex = nextItemIndex;
            return;
        }
        this.selectItem(this.selectedItemIndex, this.selectedItemIndex + 1);
        this.selectedItemIndex++;
    }

    enterHandler() {
        let code = this.keyDescriptions[this.selectedItemIndex].code;
        let args = {
            code: code
        };
        let nextScreenName = screenNames.keyBindingChangeScreen;
        let currentScreenInfo = this.screenInfo;
        let nextScreenInfo = {
            name: nextScreenName,
            isModal: true
        };
        this.moveNext(currentScreenInfo, nextScreenInfo, args);
    }

    fillOptionsList() {
        let itemsList = [];
        for (let [index, keyInfo] of this.keyDescriptions.entries()) {
            let keyDescriptionElement = document.createElement('p');
            let keyCodeElement = document.createElement('p');
            keyDescriptionElement.innerText = keyInfo.action;
            keyCodeElement.innerText = KeyboardManagerInstance.getKeyNameByCode(keyInfo.code);
            let keyElement = document.createElement('div');
            keyElement.append(keyDescriptionElement, keyCodeElement);
            this.menuDOMItems.push(keyElement);
            if (index === this.selectedItemIndex) {
                keyElement.classList.add(selectedMenuItemClass);
            }
            this.container.append(keyElement);
        }
        return itemsList;
    }

    getRender() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.fillOptionsList();
        }
        return this.container;
    }

    update() {
        if (this.container) {
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
            this.keyDescriptions = KeyboardManagerInstance.actionKeysInfo;
            this.fillOptionsList();
        }
    }

    dispatchKeyEvents(event) {
        let { keyCode } = event;
        switch (keyCode) {
            case this.keyCodes.arrowUp: {
                this.arrowUpHandler();
                break;
            }
            case this.keyCodes.arrowDown: {
                this.arrowDownHandler();
                break;
            }
            case this.keyCodes.enter: {
                this.enterHandler();
                break;
            }
            case this.keyCodes.escape: {
                this.escapeHandler();
                break;
            }
        }
    }

    dispose() {

    }

    receiveIntent(args) {

    }
}

export default OptionsScreen;