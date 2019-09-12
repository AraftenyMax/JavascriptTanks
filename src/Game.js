import ScreenManager from "./Screens/ScreenManager";
import InputService from "./Services/InputService";
import KeyboardService from "./Services/KeyboardService";
import ResourceService from "./Services/ResourceService";
import {screenNames, serviceNames} from "./Configuration/Configuration";
import MissionLists from "./GameComponents/MissionLists";
import ServiceManager from "./Services/ServiceManager";

class Game {
    constructor() {
        let inputService = new InputService();
        let keyboardService = new KeyboardService();
        let resourceService = new ResourceService();
        let missionsList = new MissionLists();
        this.serviceManager = new ServiceManager(inputService, keyboardService, resourceService, missionsList);
        this.screenManager = new ScreenManager(this.serviceManager);
        this.init();
    }

    init() {
        this.screenManager.showLoadingScreen();
        this.serviceManager[serviceNames.resourceService].loadResources().then(() => {
            this.screenManager.sendIntent(null, screenNames.loadingScreen, {isReady: true});
        });
    }

    start() {
        this.screenManager.showLoadingScreen();
    }
}

export default Game;