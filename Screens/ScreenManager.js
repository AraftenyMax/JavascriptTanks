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
                element = document.getElementsByClassName(selector)[index];
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
        let screenInstance = new ScreenClass(ResourceManagerInstance, ...args);
        return screenInstance;
    }

    showScreen(screenName, ...args) {
        let screen = this.getScreenInstance(screenName, ...args);
        if (this.screenStack.length !== 0) {
            while (this.screenStack.length > 0) {
                let scr = this.screenStack.pop();
                scr.hide();
            }
        }
        this.screenStack.push(screen);
        let screenRender = screen.getRender();
        this.documentBody.append(screenRender);
    }

    showScreenModal(screenName, ...args) {
        let screen = this.getScreenInstance(screenName, ...args);
        this.screenStack.push(screen);
        this.documentBody.append(screen);
    }

    disposeScreen(currentScreenName, ...args) {
        let currentScreenIndex = this.screenStack.findIndex((screen) => screen.name === currentScreenName);
        let screen = this.screenStack.splice(currentScreenIndex, 1);
        screen.dispose();
    }

    disposeScreenModal(currentScreenName, ...args) {
        let screenIndex = this.screenStack.findIndex((elem) => elem.name === currentScreenName);
        let screen = this.screenStack[screenIndex];
        screen.hide();
        this.screenStack.splice(screenIndex, 1);
    }

    dispatchInput(keyCode) {
        if (this.screenStack.length !== 0) {
            let [screen] = this.screenStack.slice(-1);
            screen.performAction(keyCode);
        }
    }

    displayErrorMessage(msg, ...args) {

    }
}

export default ScreenManager;