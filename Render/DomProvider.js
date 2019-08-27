import RenderProvider from './RenderProvider';

class DomProvider extends RenderProvider {
    constructor() {
        this.canvas = document.createElement('div');
        document.getElementsByTagName('body')[0].append(this.canvas);
    }

    render(obj) {
        const renderObject = obj.renderObject;
        const sprite = renderObject.getSprite();
        const transform = renderObject.getTransform();
        let object = document.createElement('div');
        object.style.width = obj.width;
        object.style.height = obj.height;
        let texture = document.createElement('img');
        texture.src = 
        this.canvas.append(object);
    }

}

export default DomProvider;