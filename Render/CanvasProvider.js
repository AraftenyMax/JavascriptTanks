import RenderProvider from './RenderProvider';
import {canvasWidth, canvasHeight} from '../Constants';

class CanvasProvider extends RenderProvider {
    constructor() {
        super();
        this.canvas = document.createElement('canvas');
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        document.getElementsByTagName('body')[0].append(this.canvas);
        this.canvasContext = this.canvas.getContext('2d');
    }

    render(obj) {
        const renderObject = obj.renderObject;
        const sprite = renderObject.getSprite();
        const transform = renderObject.getTransforms();
        this.canvasContext.drawImage(sprite, obj.x, obj.y, obj.width, obj.height);
    }
}

export default CanvasProvider;