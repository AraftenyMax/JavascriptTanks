class Screen {
    constructor(ResourceManager, sendIntent, moveNext, name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.isModal = false;
        this.isActive = false;
        this.ResourceManager = ResourceManager;
        this.sendIntent = sendIntent;
        this.moveNext = moveNext;
    }

    getRender() {

    }

    dispose() {

    }

    receiveIntent() {

    }

    get screenInfo() {
        let name = this.name;
        let modal = this.isModal;
        return {name: name, modal};
    }
}

export default Screen;