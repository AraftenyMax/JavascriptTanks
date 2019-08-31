import ScreenManager from "./Screens/ScreenManager";
import ResourceManagerInstance from "./GameComponents/ResourceManager";


class Game {
    constructor() {
        this.init();
        this.screenManager = new ScreenManager(ResourceManagerInstance);
    }

    init() {
        this.loadingScreen = new LoadingScreen();
        this.loadingScreen.start();
        ResourceManagerInstance.loadResources().then(() => {
            this.loadingScreen.hide();
        });
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