import {resources} from '../Configuration';

class ResourceManager {
    constructor() {
        this.resources = {
            sprites: {},
            sounds: {}
        };
        this.loadResources().then(() => {
            console.log('Done', this.resources.sprites);
            let image = this.resources.sprites['wall'];
            document.getElementsByTagName('canvas')[0].getContext('2d').drawImage(image, 10, 10);
            console.log('Now done.');
        });
    }

    async loadResources() {
        let spritePromises = [];
        for (let spriteName in resources.sprites) {
            let spriteUrl = resources.sprites[spriteName];
            spritePromises.push(fetch(spriteUrl));
        }
        let responses = await Promise.all(spritePromises);
        for (let response of responses) {
            if (response.ok) {
                let imageBlob = await response.blob();
                let spriteURL = URL.createObjectURL(imageBlob);
                let sprite = new Image();
                sprite.src = spriteURL;
                let spriteName = this.getSpriteName(response.url);
                this.resources.sprites[spriteName] = sprite;
            }
        }
    }

    getSpriteName(url) {
        return Object.keys(resources.sprites).find(key => resources.sprites[key] === url);
    }

    getSprite(spriteName) {
        return this.resources.sprites[spriteName];
    }
}

let ResourceManagerInstance = new ResourceManager();

export default ResourceManagerInstance;