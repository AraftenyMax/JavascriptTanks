import {SCREENS, SERVICES} from "./Configuration/Configuration";
import ServiceManager from "./ServiceManager/ServiceManager";
import config from "./ServiceManager/Config";

class Game {
    constructor() {
        this.serviceManager = new ServiceManager(config);
        this.init();
    }

    async init() {
        let ResourceManager = this.serviceManager.getService(SERVICES.resourceService);
        let ScreenManager = this.serviceManager.getService(SERVICES.screenManager);
        ScreenManager.showScreen(SCREENS.loadingScreen);
        await ResourceManager.loadResources();
        ScreenManager.showScreen(SCREENS.menuScreen);
    }
}

export default Game;