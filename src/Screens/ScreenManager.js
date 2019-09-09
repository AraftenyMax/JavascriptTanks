import {screenElemSelectType, modalWindowClass} from "../Configuration";
import LoadingScreen from "./LoadingScreen";
import MenuScreen from "./MenuScreen";
import OptionsScreen from './OptionsScreen';
import KeyBindingChangeScreen from "./KeyBindingChangeScreen";
import InputManager from "../GameComponents/InputManager";
import ResourceManagerInstance from "../GameComponents/ResourceManager";

class ScreenManager {
    constructor(resourceManager, containerInfo = {}) {
        this.resourceManager = resourceManager;
        this.screenStack = [];
        this.inputManager = new InputManager();
        this.screenClasses = {
            [LoadingScreen.type]: LoadingScreen,
            [MenuScreen.type]: MenuScreen,
            [OptionsScreen.type]: OptionsScreen,
            [KeyBindingChangeScreen.type]: KeyBindingChangeScreen
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
        let screenInstance = new ScreenClass(ResourceManagerInstance,
            this.sendIntent, this.moveNext, screenName, ScreenClass.preferredWidth,
            ScreenClass.preferredHeight, ...args);
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
        this.inputManager.subscribeOnInputEvent(screen.inputHandler);
    }

    showLoadingScreen() {
        this.showScreen(LoadingScreen.type);
    }

    showScreenModal(screenName, ...args) {
        let screen = this.getScreenInstance(screenName, ...args);
        let screenRender = screen.getRender();
        this.screenStack.push(screen);
        this.documentBody.prepend(screenRender);
        screenRender.classList.add(modalWindowClass);
        this.inputManager.unsubscribeInputEvent(screen.inputHandler);
    }

    removeScreenFromStack(screenName) {
        let screenIndex = this.screenStack.findIndex((screen) => screen.type === screenName);
        let screen = this.screenStack.splice(screenIndex, 1)[0];
        return screen;
    }

    disposeScreen(screenName, ...args) {
        let screen = this.removeScreenFromStack(screenName);
        screen.dispose(...args);
        this.screenParentContainer.removeChild(screen.getRender());
    }

    moveNext(currentScreenInfo, nextScreenInfo, ...args) {
        let {name:currentScreenName, isModal:isCurrentModal = false} = currentScreenInfo;
        let {name:nextScreenName, isModal:isNextModal = false} = nextScreenInfo;
        if (!isNextModal) {
            this.disposeScreen(currentScreenName);
            this.showScreen(nextScreenName, ...args);
        } else {
            this.showScreenModal(nextScreenName, ...args);
        }
    }

    sendIntent(fromScreen, toScreen, ...args) {
        console.log(toScreen);
        let screen = this.screenStack.find((scr) => scr.name === toScreen);
        screen.receiveIntent(fromScreen, ...args);
    }

    showErrorMessage(msg, ...args) {

    }
}

export default ScreenManager;