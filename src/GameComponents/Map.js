class Map {
    constructor() {
        this.map = [];
        this.objects = {};
        this.init();
    }

    init() {
        this.map = [[4, -1, -1, -1, -1],
         [0, 0, 0, -1, 3],
         [2, -1, -1, -1, 0],
         [-1, -1, 0, -1, -1],
         [-1, -1, -1, -1, -1]];
    }
}

export default Map;