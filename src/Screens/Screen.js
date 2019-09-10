class Screen {
    constructor(ResourceManager, sendIntent, moveNext, fallBack, name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.isModal = false;
        this.isActive = false;
        this.ResourceManager = ResourceManager;
        this.sendIntent = sendIntent;
        this.moveNext = moveNext;
        this.fallBack = fallBack;
    }

    getRender() {

    }

    dispose() {

    }

    receiveIntent() {

    }

    update() {

    }

    get screenInfo() {
        let name = this.name;
        let modal = this.isModal;
        return {name: name, modal};
    }
}

export default Screen;