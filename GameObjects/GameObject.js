import {cellSize} from '../Constants';

class GameObject {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = cellSize;
        this._height = cellSize;
        this.state = {};
    }

    update() {}

    render() {}

    set x(x) {
        this._x = x;
    }

    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
    }

    get y() {
        return this._y;
    }

    set width(width) {
        this._width = width;
    }

    set height(height) {
        this._height = height;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }
}

export default GameObject;