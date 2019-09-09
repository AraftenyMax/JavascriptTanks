import {resources} from '../Configuration';

class ResourceManager {
    constructor() {
        this.resources = {
            sprites: {},
            sounds: {}
        };
        this.loadResources().then(() => {
            console.log('Done', this.resources.sprites);
            console.log('Now done.');
        });
    }

    async loadResources() {
        let spritePromises = [];
        let imageBlobPromises = [];
        for (let spriteName in resources.sprites) {
            let spriteUrl = resources.sprites[spriteName];
            spritePromises.push(fetch(spriteUrl));
        }
        let responses = await Promise.all(spritePromises);
        responses.map((response) => imageBlobPromises.push(response.blob()));
        let imageBlobs = await Promise.all(imageBlobPromises);
        for (let [index, imageBlob] of imageBlobs.entries()) {
            let spriteURL = URL.createObjectURL(imageBlob);
            let sprite = new Image();
            sprite.src = spriteURL;
            let spriteName = this.getSpriteName(responses[index].url);
            this.resources.sprites[spriteName] = sprite;
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