import InputManager from "../Services/InputManager";
import {ScreenManager, ScreenManagerFactory} from "../Services/ScreenManager";
import ScreenRenderer from "../Services/ScreenRenderer";
import {ScreenProvider, ScreenProviderFactory} from "../Services/ScreenProvider";
import ResourceManager from "../Services/ResourceManager";
import KeyboardManager from "../Services/KeyboardManager";

let config = {
    services: {
        [InputManager.name]: new InputManager(),
        [ScreenRenderer.name]: new ScreenRenderer(),
        [ResourceManager.name]: new ResourceManager(),
        [KeyboardManager.name]: new KeyboardManager()
    },
    invokable: {
    },
    factories: {
        [ScreenManager.name]: ScreenManagerFactory,
        [ScreenProvider.name]: ScreenProviderFactory,
    }
};

export default config;