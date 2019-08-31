import {textureIds} from './Constants';

class ResourceManager {
    constructor() {
        this.textures = {};
        for(let textureInternId in textureIds) {
            let textureId = textureIds[textureInternId];
            let texture = document.getElementById(textureId);
            if (!texture) {
                throw new ReferenceError('Texture is not found: ${textureId}');
            }
            this.textures[textureInternId] = texture;
        }
    }
}

export default ResourceManager;