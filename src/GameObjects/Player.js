import Tank from "./Tank";
import RenderObject from '../Render/RenderObject';
import ResourceManagerInstance from '../Services/ResourceManager';
import {resourceNames} from '../Configuration/Configuration';

class Player extends Tank {
    constructor(renderer, x, y) {
        super();
        this.renderer = renderer;
        let spriteName = resourceNames.templateNames.player + this.currentState;
        this.renderObject = new RenderObject(
            ResourceManagerInstance.getSprite(spriteName)
        );
        this.x = x;
        this.y = y;
    }
}

export default Player;