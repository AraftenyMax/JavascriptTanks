import Screen from "./Screen";
import {
    defaultWindowHeight,
    defaultWindowWidth,
    SCREENS,
    selectedMenuItemClass,
    SERVICES
} from "../Configuration/Configuration";
import {keyEvent} from "../Configuration/KeyboardSettings";

class MenuScreen extends Screen {
    static type = SCREENS.menuScreen;
    static preferredWidth = defaultWindowWidth;
    static preferredHeight = defaultWindowHeight;
    constructor(serviceLocator, name,...args) {
        super(name, ...args);
        this.screenManager = serviceLocator.getService(SERVICES.screenManager);
        this.inputHandler = (...args) => this.dispatchKeyEvents(...args);
        this.menuItemsInfo = [
            {
                text: 'Play',
                nextScreenName: SCREENS.missionSelectScreen
            },
            {
                text: 'Statistics',
                nextScreenName: SCREENS.statisticsScreen
            },
            {
                text: 'Settings',
                nextScreenName: SCREENS.optionsScreen
            },
            {
                text:'Upgrade tank',
                nextScreenName: SCREENS.upgradeScreen
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
        this.menuDOMItems[previousIndex].classList.remove(selectedMenuItemClass);
        this.menuDOMItems[nextIndex].classList.add(selectedMenuItemClass);
    }

    arrowUpHandler() {
        if (this.selectedItemIndex === 0) {
            let nextItemIndex = this.menuItemsInfo.length - 1;
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
        let { nextScreenName, isModal = false }= this.menuItemsInfo[this.selectedItemIndex];
        let currentScreenInfo = this.screenInfo;
        let nextScreenInfo = {
            name: nextScreenName,
            isModal: isModal
        };
        this.screenManager.showScreen();
    }

    getRender() {
        if (!this.container) {
            this.container = document.createElement('div');
            for (let [index, menuItemInfo] of this.menuItemsInfo.entries()) {
                let menuItem = document.createElement('h2');
                if (menuItemInfo.text === this.menuItemsInfo[this.selectedItemIndex].text) {
                    menuItem.classList.add(selectedMenuItemClass);
                }
                menuItem.innerText = menuItemInfo.text;
                this.menuDOMItems.push(menuItem);
                this.container.append(menuItem);
            }
        }
        return this.container;
    }

    dispose() {

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

    receiveIntent() {

    }
}

export default MenuScreen;