class MissionLists {
    constructor() {
        this.list = [];
    }

    *[Symbol.iterator]() {
        for (let mission of this.list) {
            yield mission;
        }
    }
}