import CanvasProvider from './Render/CanvasProvider.js';
import Tank from './GameObjects/Tank.js';
import Player from './GameObjects/Player';
import Renderer from './Render/Renderer.js';

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

export default Game;