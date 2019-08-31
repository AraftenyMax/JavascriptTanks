import {mapMarkers} from './Constants';
import ResourceManager from './ResourceManager';

class CanvasRender {
    constructor(canvas, meter = 40) {
        this.canvas = canvas; 
        this.meter = meter;
        this.canvasWidth = canvas.offsetWidth;
        this.canvasHeight = canvas.offsetHeight;
        this.canvasContext = canvas.getContext('2d');
        this.resourceManager = new ResourceManager();
        this.gameObjects = {};
    }

    movePlayer(x, y, angle, justRotate=false) {

    }

    drawTank(x, y) {

    }

    drawPlayer(x, y) {
        this.canvasContext.drawImage(
            this.resourceManager.textures.player, x, y, this.meter, this.meter);
    }
    
    drawBonus(x, y) {

    }

    drawGround(x, y) {
        this.canvasContext.drawImage(
            this.resourceManager.textures.ground, x, y, this.meter, this.meter);
    }

    drawWall(x, y) {
        this.canvasContext.drawImage(
            this.resourceManager.textures.wall, x, y, this.meter, this.meter);
    }

    drawFlag(x, y) {
        this.canvasContext.drawImage(
            this.resourceManager.textures.flag, x, y, this.meter, this.meter);
    }

    drawMap(map) {
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                let scaledX = x * this.meter;
                let scaledY = y * this.meter;
                let elementType = map[x][y];
                switch(elementType) {
                    case mapMarkers.empty:
                        this.drawGround(scaledX, scaledY);
                        break;
                    case mapMarkers.wall:
                        this.drawWall(scaledX, scaledY);
                        break;
                    case mapMarkers.bonus:
                        this.drawBonus(x, y);
                        break;
                    case mapMarkers.flag:
                        this.drawFlag(x, y);
                        break;
                    case mapMarkers.player:
                        this.drawGround(scaledX, scaledY);
                        this.drawPlayer(scaledX, scaledY);
                        break;
                }
            }
        }
    }
}

export default CanvasRender;