import {ActionNames, GameKeyCodes, KeyboardScheme} from "../KeyboardSettings";

class KeyboardManager {
    constructor() {
        this._keysAvailableForBind = [...KeyboardScheme];
        this._actionNames = [...ActionNames];
        this._actionKeysInfo = [...GameKeyCodes];
    }

    get actionKeysInfo() {
        return this._actionKeysInfo;
    }

    isKeyFree(code) {
        return this.isKeyAvailableForBind(code) && this.isKeyNotBindAlready(code);
    }

    isKeyAvailableForBind(code) {
        let key = this.getKeyInfoByCode(code);
        return !!key;
    }

    bindKeyToAction(action, code) {
        let index = this._actionKeysInfo.findIndex((key) => {
            let { action: actionName } = key;
            return action === actionName;
        });
        this._actionKeysInfo[index].code = code;
    }

    isKeyNotBindAlready(code) {
        let key = this.getActionKeyInfoByCode(code);
        return !!key;
    }

    getKeyNameByCode(code) {
        let { name } = this.getKeyInfoByCode(code);
        return name;
    }

    getKeyInfoByCode(code) {
        for (let keyInfo of this._keysAvailableForBind) {
            let { code:keyCode, name } = keyInfo;
            if (keyCode === code) {
                return {code: keyCode, name};
            }
        }
        return null;
    }

    getActionKeyInfoByCode(code) {
        for (let keyInfo of this._actionKeysInfo) {
            let { code:keyCode, description, name } = keyInfo;
            if (keyCode === code) {
                return {code: keyCode, description, name};
            }
        }
        return null;
    }
}

let KeyboardManagerInstance = new KeyboardManager();
export default KeyboardManagerInstance;