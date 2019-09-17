import {screenElemSelectType, modalWindowClass, SERVICES} from "../Configuration/Configuration";
import LoadingScreen from "../Screens/LoadingScreen";
import MenuScreen from "../Screens/MenuScreen";
import OptionsScreen from '../Screens/OptionsScreen';
import KeyBindingChangeScreen from "../Screens/KeyBindingChangeScreen";
import InputManager from "./InputManager";
import ResourceManagerInstance from "./ResourceManager";
import ScreenProvider from "./ScreenProvider";
import Factory from "../ServiceManager/Factory/Factory";

class ScreenManager {
    constructor(inputManager, screenProvider, screenRenderer) {
        this.inputManager = inputManager;
        this.screenProvider = screenProvider;
        this.screenRenderer = screenRenderer;
        this.screenStack = [];
    }

    showScreen(screenName, ...args) {
        let screen = this.screenProvider.getScreenInstance(screenName, ...args);
        if (this.screenStack.length !== 0) {
            while (this.screenStack.length > 0) {
                let scr = this.screenStack.pop();
                this.disposeScreen(scr.name);
            }
        }
        this.screenStack.push(screen);
        this.screenRenderer.showScreen(screen);
    }

    showLoadingScreen() {
        this.showScreen(LoadingScreen.type);
    }

    showScreenModal(screenName, ...args) {
        let screen = this.screenProvider.getScreenInstance(screenName, ...args);
        this.screenStack.push(screen);
        this.screenRenderer.showScreen(screen);
    }

    removeScreenFromStack(screenName) {
        let screenIndex = this.screenStack.findIndex((screen) => screen.type === screenName);
        let screen = this.screenStack.splice(screenIndex, 1)[0];
        return screen;
    }

    disposeScreen(screenName, ...args) {
        let screen = this.removeScreenFromStack(screenName);
        screen.dispose(...args);
        this.inputManager.unsubscribeInputEvent(screen.inputHandler);
        this.screenRenderer.hideScreen(screen);
    }
}

class ScreenManagerFactory extends Factory {
    invoke(serviceManager, requestedName, options = null) {
        let inputManager = serviceManager.getService(SERVICES.inputService);
        let screenProvider = serviceManager.getService(SERVICES.screenProvider);
        let screenRenderer = serviceManager.getService(SERVICES.screenRenderer);
        let screenManager = new ScreenManager(inputManager, screenProvider, screenRenderer);
        return screenManager;
    }
}

export {ScreenManager, ScreenManagerFactory};