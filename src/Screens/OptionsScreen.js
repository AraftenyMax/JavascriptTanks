import Screen from "./Screen";
import {selectedMenuItemClass, screenNames, defaultWindowWidth, defaultWindowHeight} from "../Configuration";
import {KeyboardScheme, GameKeyCodes, ActionNames} from "../KeyboardSettings";
import KeyboardManagerInstance from "../GameComponents/KeyboardManager";

class OptionsScreen extends Screen {
    static type = screenNames.optionsScreen;
    static preferredWidth = defaultWindowWidth;
    static preferredHeight = defaultWindowHeight;
    constructor(resourceManager, sendIntent, moveNext, ...args) {
        super(resourceManager, sendIntent, moveNext, ...args);
        this.container = null;
        this.inputHandler = (...args) => this.dispatchKeyEvents(...args);
        this.selectedItemIndex = 0;
        this.keyDescriptions = KeyboardManagerInstance.actionKeysInfo;
        this.menuDOMItems = [];
        this.keyCodes = {
            enter: 13,
            arrowUp: 38,
            arrowDown: 40,
            escape: 27
        };
    }

    selectItem(previousIndex, nextIndex) {
        this.menuDOMItems[previousIndex].classList.remove(selectedMenuItemClass);
        this.menuDOMItems[nextIndex].classList.add(selectedMenuItemClass);
    }

    escapeHandler() {
        let nextScreenName = screenNames.menuScreen;
        let currentScreenInfo = this.screenInfo;
        let nextScreenInfo = {
            nextScreenName: nextScreenName,
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

    getRender() {
        if (!this.container) {
            console.log(this.keyDescriptions);
            this.container = document.createElement('div');
            for (let [index, keyInfo] of this.keyDescriptions.entries()) {
                let keyDescriptionElement = document.createElement('p');
                let keyCodeElement = document.createElement('p');
                keyDescriptionElement.innerText = keyInfo.description;
                keyCodeElement.innerText = KeyboardManagerInstance.getKeyNameByCode(keyInfo.code);
                let keyElement = document.createElement('div');
                keyElement.append(keyDescriptionElement, keyCodeElement);
                this.menuDOMItems.push(keyElement);
                if (index === this.selectedItemIndex) {
                    keyElement.classList.add(selectedMenuItemClass);
                }
                this.container.append(keyElement);
            }
        }
        return this.container;
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