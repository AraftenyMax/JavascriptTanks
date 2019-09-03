import Screen from "./Screen";
import {screenNames, keyEvent, selectedMenuItemClass} from "../Configuration";

class MenuScreen extends Screen {
    static name = 'menuscreen';
    constructor(ResourceManager, sendIntent, moveNext, ...args) {
        super();
        this.sendIntent = sendIntent;
        this.moveNext = moveNext;
        this.dispatchKeyEvents = this.dispatchKeyEvents.bind(this);
        this.menuItemsInfo = [
            {
                text: 'Play',
                nextScreenName: screenNames.missionSelectScreen
            },
            {
                text: 'Statistics',
                nextScreenName: screenNames.statisticsScreen
            },
            {
                text: 'Options',
                nextScreenName: screenNames.optionsScreen
            },
            {
                text:'Upgrade tank',
                nextScreenName: screenNames.upgradeScreen
            }
        ];
        this.menuDOMItems = [];
        this.keyCodes = {
            enter: 13,
            arrowUp: 38,
            arrowDown: 40
        };
        this.selectedItemIndex = 0;
        this.container = null;
    }

    selectItem(previousIndex, nextIndex) {
        this.menuDOMItems.classList.remove(selectedMenuItemClass);
        this.menuDOMItems.classList.add(nextIndex);
    }

    arrowUpHandler() {
        if (this.selectedItemIndex === 0) {
            let nextItemIndex = this.menuItemsInfo.length;
            this.selectItem(this.selectedItemIndex, nextItemIndex);
            return;
        }
        this.selectItem(this.selectedItemIndex, this.selectedItemIndex - 1);
        this.selectedItemIndex--;
    }

    arrowDownHandler() {
        if (this.selectedItemIndex === this.menuItemsInfo.length) {
            let nextItemIndex = 0;
            this.selectItem(this.selectedItemIndex, nextItemIndex);
            return;
        }
        this.selectItem(this.selectedItemIndex, this.selectedItemIndex + 1);
        this.selectedItemIndex++;
    }

    enterHandler() {
        let currentScreenName = this.name;
        let isThisModal = this.isModal;
        let { nextScreenName, isModal = false }= this.menuItemsInfo[this.selectedItemIndex];
        let currentScreenInfo = {
            currentScreenName: currentScreenName,
            isModal: isThisModal
        };
        let nextScreenInfo = {
            nextScreenName: nextScreenName,
            isModal: isModal
        };
        this.moveNext(currentScreenInfo, nextScreenInfo);
    }

    getRender() {
        if (!this.container) {
            this.container = document.createElement('div');
            for (let index, menuItemInfo of this.menuItemsInfo.entries()) {
                let menuItem = document.createElement('h2');
                if (menuItemInfo.text === index) {
                    menuItem.classList.add(selectedMenuItemClass);
                }
                menuItem.innerText = menuItem.text;
                this.menuDOMItems.append(menuItem);
                this.container.append(menuItem);
            }
        }
        return this.container;
    }

    dispose() {
        this.removeEventsHandler();
    }

    dispatchKeyEvents(event) {
        let { keyCode } = event;
        switch (keyCode) {
            case this.keyCodes.arrowUp:
                this.arrowUpHandler();
                break;
            case this.keyCodes.arrowDown:
                this.arrowDownHandler();
                break;
            case this.keyCodes.enter:
                this.enterHandler();
                break;
            default:
                console.log(`Unknown input. Component: ${this.name}`);
        }
    }

    bindOnKeyEvents() {
        document.addEventListener(keyEvent, this.dispatchKeyEvents);
    }

    receiveIntent() {

    }

    removeEventsHandler() {
        document.removeEventListener(keyEvent, this.dispatchKeyEvents);
    }

    get name() {
        return screenNames.menuScreen;
    }
}

export default MenuScreen;