class Screen {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.isModal = false;
        this.isActive = false;
        this.container = null;
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