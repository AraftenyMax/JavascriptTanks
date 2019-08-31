import Screen from "./Screen";

class MenuScreen extends Screen {
    static name = 'menuscreen';
    constructor() {
        super();
        this.menuItemsText = ['Play', 'Statistics', 'Upgrade tank'];
        this.documentBody = document.getElementsByTagName('body')[0];
    }

    show() {
        let menuItems = [];
        for (let menuItemText of this.menuItemsText) {
            let menuItem = document.createElement('button')
        }
    }
}

export default MenuScreen;