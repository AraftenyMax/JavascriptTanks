import {screenElemSelectType} from "../Configuration";
import LoadingScreen from "./LoadingScreen";
import MenuScreen from "./MenuScreen";
import MissionListScreen from "./MissionListScreen";
import MissionScreen from "./MissionScreen";
import ResourceManagerInstance from "../GameComponents/ResourceManager";

class ScreenManager {
    constructor(resourceManager, containerInfo = {}) {
        this.resourceManager = resourceManager;
        this.screenStack = [];
        this.screenClasses = {
            [LoadingScreen.name]: LoadingScreen,
            [MenuScreen.name]: MenuScreen,
            [MissionListScreen.name]: MissionListScreen,
            [MissionScreen.name]: MissionScreen
        };
        this.screenParentContainer = null;
        this.documentBody = document.getElementsByTagName('body')[0];
        this.sendIntent = this.sendIntent.bind(this);
        this.moveNext = this.moveNext.bind(this);
        this.findScreenParent(containerInfo);
    }

    findScreenParent({type = screenElemSelectType.htmlTag, selector = 'body', index = 0} = {}) {
        let element = null;
        switch (type) {
            case screenElemSelectType.htmlId: {
                element = document.getElementById(selector);
                break;
            }
            case screenElemSelectType.htmlClass: {
                element = document.getElementsByClassName(selector)[index];
                break;
            }
            case screenElemSelectType.htmlTag: {
                element = document.getElementsByTagName(selector)[index];
                break;
            }
            default: {
                throw new Error('Unknown selection type of screen container');
            }
        }
        if (!element) {
            throw new ReferenceError(`Couldn\'t find dom element with selector ${selector} and index ${index}`);
        }
        this.screenParentContainer = element;
    }

    getScreenInstance(screenName, ...args) {
        if (!(screenName in this.screenClasses)) {
            throw new Error(`Unknown screen name: ${screenName}`);
        }
        if (this.screenStack.includes(screenName)) {
            throw new Error(`Attempt to start screen which already is present: ${screenName}`);
        }
        let ScreenClass = this.screenClasses[screenName];
        let screenInstance = new ScreenClass(ResourceManagerInstance, this.sendIntent, this.moveNext,...args);
        return screenInstance;
    }

    showScreen(screenName, ...args) {
        let screen = this.getScreenInstance(screenName, ...args);
        if (this.screenStack.length !== 0) {
            while (this.screenStack.length > 0) {
                let scr = this.screenStack.pop();
                this.disposeScreen(scr.name);
            }
        }
        this.screenStack.push(screen);
        let screenRender = screen.getRender();
        this.screenParentContainer.append(screenRender);
        screen.bindOnKeyEvents();
    }

    showLoadingScreen() {
        this.showScreen(LoadingScreen.name);
    }

    showScreenModal(screenName, ...args) {
        let screen = this.getScreenInstance(screenName, ...args);
        let screenRender = screen.getRender();
        this.screenStack.push(screen);
        this.documentBody.append(screenRender);
        screen.bindOnKeyEvents();
    }

    removeScreenFromStack(screenName) {
        let screenIndex = this.screenStack.findIndex((screen) => screen.name === screenName);
        let screen = this.screenStack.splice(screenIndex, 1)[0];
        return screen;
    }

    disposeScreen(screenName, ...args) {
        let screen = this.removeScreenFromStack(screenName);
        screen.dispose();
        this.screenParentContainer.removeChild(screen.getRender());
    }

    disposeScreenModal(screenName, ...args) {
        let screen = this.removeScreenFromStack(screenName);
        screen.dispose();
        this.documentBody.removeChild(screen.getRender());
    }

    moveNext(currentScreenInfo, nextScreenInfo, ...args) {
        let {currentScreenName, isCurrentModal = false} = currentScreenInfo;
        let {nextScreenName, isNextModal = false} = nextScreenInfo;
        if (!isCurrentModal) {
            this.disposeScreen(currentScreenName);
        } else {
            this.disposeScreenModal(currentScreenName);
        }
        if (!isNextModal) {
            this.showScreen(nextScreenName, ...args);
        } else {
            this.showScreenModal(nextScreenName, ...args);
        }
    }

    sendIntent(fromScreen, toScreen, args) {
        let screen = this.screenStack.find((scr) => scr.name === toScreen);
        screen.receiveIntent(fromScreen, args);
    }

    showErrorMessage(msg, ...args) {

    }
}

export default ScreenManager;