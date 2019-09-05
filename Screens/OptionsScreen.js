import Screen from "./Screen";
import {selectedMenuItemClass, screenNames} from "../Configuration";
import {KeyboardScheme, GameKeyCodes, GameKeyNames, keyEvent} from "../KeyboardSettings";

class OptionsScreen extends Screen {
    static type = screenNames.optionsScreen;
    constructor(resourceManager, sendIntent, moveNext) {
        super(sendIntent, moveNext);
        this.container = null;
        this.dispatchKeyEvents = this.dispatchKeyEvents.bind(this);
        this.selectedItemIndex = 0;
        this.keyDescriptions = [
            {
                name: GameKeyNames.moveUp,
                description: 'Move up'
            },
            {
                name: GameKeyNames.moveDown,
                description: 'Move down',
            },
            {
                name: GameKeyNames.moveLeft,
                description: 'Move left',
            },
            {
                name: GameKeyNames.moveRight,
                description: 'Move right',
            },
            {
                name: GameKeyNames.pause,
                description: 'Pause game',
            },
            {
                name: GameKeyNames.showMenu,
                description: 'Show game menu(pauses game)',
            },
            {
                name: GameKeyNames.showKeySettings,
                description: 'Show keyboard bindings',
            },
            {
                name: GameKeyNames.shoot,
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
        this.selectItem(this.selectedItemIndex, this.selectedItemIndex + 1);
        this.selectedItemIndex++;
    }

    enterHandler() {
        let keyName = this.keyDescriptions[this.selectedItemIndex].name;
        let args = {
            keyCode: GameKeyCodes[keyName]
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
                let keyCode = GameKeyCodes[keyInfo.name];
                keyCodeElement.innerText = KeyboardScheme[keyCode];
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

export default OptionsScreen;