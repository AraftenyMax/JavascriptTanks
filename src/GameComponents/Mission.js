class Mission {
    constructor(name, map, isLocked) {
        this.name = name;
        this.map = [...map];
        this.isLocked = isLocked;
    }
}

export default Mission;