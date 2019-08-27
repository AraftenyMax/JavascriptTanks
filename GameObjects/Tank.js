import GameObject from './GameObject';

class Tank extends GameObject {
    constructor() {
        super();
        this.states = {
            MOVE: 'move',
            SHOOT: 'shoot',
            IDLE: 'idle'    
        };
        this.speed = 0.1;

        //mock objects

        this.currentState = this.states.IDLE;
    }
}

export default Tank;