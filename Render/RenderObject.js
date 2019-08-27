import {cellSize} from '../Constants';

class RenderObject {
    constructor(sprite, width = cellSize, height = cellSize) {
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.transform = {};
    }

    getSprite() {
        return this.sprite;
    }

    getTransforms() {
        return this.transform;
    }

    transform(tramsform) {
        this.transform = tramsform;
    }
}

export default RenderObject;