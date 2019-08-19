import Map from './Map';
import CanvasRender from './CanvasRender';
import DomRender from './DomRender';
import {renderEngine, directionAngle} from './Constants';
import KeyboardSettings from './KeyboardSettings';

class Game {
    constructor(container, engine = renderEngine.canvas) {
        this.map = new Map();
        this.render = this.createRenderEngine(engine, container);
        this.render.drawMap(this.map.map);
    }

    createRenderEngine(choice, container) {
        switch(choice) {
            case renderEngine.canvas:
                return new CanvasRender(container);
            case renderEngine.dom:
                return new DomRender(container);
            default:
                return new CanvasRender(container);
        }
    }

    bindOnInput() {
        document.addEventListener('keyup', (event) => {
            switch(event.code) {
                case KeyboardSettings.moveUp:
                    break;
                case KeyboardSettings.moveDown:
                    break;
                case KeyboardSettings.moveLeft:
                    break;
                case KeyboardSettings.moveRight:
                    break;
                case KeyboardSettings.fire:
                    break;
            }
        });
    }

    gameLoop() {

    }
}

export default Game;