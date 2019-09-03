import ScreenManager from "./Screens/ScreenManager";
import {screenNames} from "./Configuration";
import ResourceManagerInstance from "./GameComponents/ResourceManager";


class Game {
    constructor() {
        this.screenManager = new ScreenManager(ResourceManagerInstance);
        this.init();
    }

    init() {
        this.screenManager.showLoadingScreen();
        ResourceManagerInstance.loadResources().then(() => {
            this.screenManager.sendIntent(null, screenNames.loadingScreen, {isReady: true});
        });
    }

    start() {
        this.screenManager.showLoadingScreen();
    }
}
/*
class Game {
    constructor() {
        this.renderer = new Renderer(new CanvasProvider());
        this.gameObjects = [
            new Player(this.renderer, 10, 20)
        ];
    }

    start() {
        this.drawMap();
    }

    stop() {

    }

    restart() {

    }

    drawMap() {
        this.gameObjects.map(gameObject => {
            gameObject.render(this.renderer);
        })
    }

    loop(tick) {

        this.gameObjects.forEach(gameObject => {
            gameObject.update(tick);
            gameObject.render(this.renderer);
        });
        requestAnimationFrame(loop);
    }
}
*/
export default Game;