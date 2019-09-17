import LoadingScreen from "../Screens/LoadingScreen";
import MenuScreen from "../Screens/MenuScreen";
import OptionsScreen from "../Screens/OptionsScreen";
import KeyBindingChangeScreen from "../Screens/KeyBindingChangeScreen";
import MissionScreen from "../Screens/MissionScreen";
import MissionsList from "../GameComponents/MissionsList";
import Factory from "../ServiceManager/Factory/Factory";

class ScreenProvider {
    constructor(serviceLocator) {
        this.screenClasses = {
            [LoadingScreen.type]: LoadingScreen,
            [MenuScreen.type]: MenuScreen,
            [OptionsScreen.type]: OptionsScreen,
            [KeyBindingChangeScreen.type]: KeyBindingChangeScreen,
            [MissionScreen.type]: MissionScreen,
            [MissionsList.type]: MissionsList
        };
        this.serviceLocator = serviceLocator;
    }

    getScreenInstance(screenName, ...args) {
        if (!(screenName in this.screenClasses)) {
            throw new Error(`Unknown screen name: ${screenName}`);
        }
        let ScreenClass = this.screenClasses[screenName];
        let screenInstance = new ScreenClass(this.serviceLocator, screenName, ScreenClass.preferredWidth,
            ScreenClass.preferredHeight, ...args);
        return screenInstance;
    }
}

class ScreenProviderFactory extends Factory {
    invoke(serviceLocator, requestedName, options = null) {
        return new ScreenProvider(serviceLocator);
    }
}

export {ScreenProviderFactory, ScreenProvider};