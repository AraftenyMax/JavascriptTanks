import {resources} from '../Constants';

class ResourceLoader {
    constructor() {
        
    }

    async loadResources() {
        let spritePromises = [];
        for (let spriteName in resources.sprites) {
            let spriteUrl = resources.sprites[spriteName];
            spritePromises.push(fetch(spriteUrl));
        }
        let responses = await Promise.all(spritePromises);
        for(let response of responses) {
            let spriteName = this.getSpriteName(response.url);
            //let spriteUrl = URL.createObjectURL(response.blob());
            let spriteImage = document.createElement('img');
            spriteImage.src = spriteUrl; 
            this.resources.sprites[spriteName] = spriteImage;
        }
    }

    getSpriteName(url) {
        return Object.keys(resources.sprites).find(key => resources.sprites[key] === url);
    }
}

export default ResourceLoader;