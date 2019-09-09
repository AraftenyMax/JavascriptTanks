import GameObject from './GameObject';

class Breakable extends GameObject {
    constructor() {
        health = 100;
        defense = 20;
    }

    isAlive() {
        return health > 0;
    }
}

export default Breakable;