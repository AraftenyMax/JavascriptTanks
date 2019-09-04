import Screen from "./Screen";
import {gameKeyNames, gameKeyCodes, keyEvent, selectedMenuItemClass, screenNames} from "../Configuration";
import KeyboardScheme from "../KeyboardScheme";

class OptionsScreen extends Screen {
    name = screenNames.optionsScreen;
    constructor(resourceManager, sendIntent, moveNext) {
        super(sendIntent, moveNext);
        this.container = null;
        this.dispatchKeyEvents = this.dispatchKeyEvents.bind(this);
        this.selectedItemIndex = 0;
        this.keyDescriptions = [
            {
                name: gameKeyNames.moveUp,
                description: 'Move up'
            },
            {
                name: gameKeyNames.moveDown,
                description: 'Move down',
            },
            {
                name: gameKeyNames.moveLeft,
                description: 'Move left',
            },
            {
                name: gameKeyNames.moveRight,
                description: 'Move right',
            },
            {
                name: gameKeyNames.pause,
                description: 'Pause game',
            },
            {
                name: gameKeyNames.showMenu,
                description: 'Show game menu(pauses game)',
            },
            {
                name: gameKeyNames.showKeySettings,
                description: 'Show keyboard bindings',
            },
            {
                name: gameKeyNames.shoot,
                description: 'Shoot',
            }
        ];
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
        let screenName = this.name;
        let nextScreenName = screenNames.menuScreen;
        let currentScreenInfo = {
            currentScreenName: screenName,
            isModal: false
        };
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
        this.selectedItemIndex(this.selectedItemIndex, this.selectedItemIndex + 1);
        this.selectedItemIndex++;
    }

    enterHandler() {
        let keyName = this.keyDescriptions[this.selectedItemIndex].name;
        let args = {
            keyCode: gameKeyCodes[keyName]
        };
        let screenName = this.name;
        let nextScreenName = screenNames.keyBindingChangeScreen;
        let isThisModal = this.isModal;
        let currentScreenInfo = {
            currentScreenName: screenName,
            isModal: isThisModal,
        };
        let nextScreenInfo = {
            nextScreenName: nextScreenName,
            isModal: true
        };
        this.moveNext(currentScreenInfo, nextScreenInfo, args);
    }

    getRender() {
        if (!this.container) {
            this.container = document.createElement('div');
            for (let [index, keyInfo] of this.keyDescriptions.entries()) {
                let keyDescriptionElement = document.createElement('p');
                let keyCodeElement = document.createElement('p');
                keyDescriptionElement.innerText = keyInfo.description;
                let keyCode = gameKeyCodes[keyInfo.name];
                keyCodeElement.innerText = KeyboardScheme[keyCode];
                let keyElement = document.createElement('div');
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
        this.removeEventsHandler();
    }

    receiveIntent(args) {

    }

    bindOnKeyEvents() {
        document.addEventListener(keyEvent, this.dispatchKeyEvents);
    }

    removeEventsHandler() {
        document.removeEventListener(keyEvent, this.dispatchKeyEvents);
    }

    get name() {
        return screenNames.optionsScreen;
    }
}

export default Screen;