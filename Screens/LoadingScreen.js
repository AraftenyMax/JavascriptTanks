import Screen from './Screen';

class LoadingScreen extends Screen {
    static name = 'menuscreen';
    constructor(parentElement) {
        super();
        this.parentElement = parentElement;
        this.container = null;
        this.keyCodeEvents = {};
    }

    getRender() {
        let msg = document.createElement('h1');
        msg.innerText = "Loading...";
        this.container = document.createElement('div');
        this.container.append(msg);
        return this.container;
    }

    bindOnKeyEvents(keyCode) {
        super.bindOnKeyEvents();
        switch (keyCode) {

        }
    }

    hide() {
        this.documentBody.removeChild(this.container);
    }
}

export default LoadingScreen;