import {modalWindowClass, screenElemSelectType} from "../Configuration/Configuration";

class ScreenRenderer {
    constructor() {
        this.screenParentContainer = null;
        this.documentBody = document.getElementsByTagName('body')[0];
    }

    findScreenParent({type = screenElemSelectType.htmlTag, selector = 'body', index = 0} = {}) {
        let element = null;
        switch (type) {
            case screenElemSelectType.htmlId: {
                element = document.getElementById(selector);
                break;
            }
            case screenElemSelectType.htmlClass: {
                element = document.getElementsByClassName(selector)[index];
                break;
            }
            case screenElemSelectType.htmlTag: {
                element = document.getElementsByTagName(selector)[index];
                break;
            }
            default: {
                throw new Error('Unknown selection type of screen container');
            }
        }
        if (!element) {
            throw new ReferenceError(`Couldn\'t find dom element with selector ${selector} and index ${index}`);
        }
        this.screenParentContainer = element;
    }

    showScreen(screen) {
        let screenRender = screen.getRender();
        this.screenParentContainer.append(screenRender);
    }

    showScreenModal(screen) {
        let screenRender = screen.getRender();
        this.documentBody.prepend(screenRender);
        screenRender.classList.add(modalWindowClass);
        this.inputManager.subscribeOnInputEvent(screen.inputHandler);
    }

    hideScreen(screen) {
        this.screenParentContainer.removeChild(screen.getRender());
    }

    hideScreenModal(screen) {
        this.screenParentContainer.removeChild(screen.getRender());
    }
}

export default ScreenRenderer;