import {ActionNames, ActionsInfo, KeyboardScheme} from "../Configuration/KeyboardSettings";
import {serviceNames} from "../Configuration/Configuration";

class KeyboardService {
    constructor() {
        this._keysAvailableForBind = [...KeyboardScheme];
        this._actionNames = {...ActionNames};
        this._actionKeysInfo = [...ActionsInfo];
        this.name = serviceNames.keyboardService;
    }

    get actionKeysInfo() {
        return this._actionKeysInfo;
    }

    isKeyFree(code) {
        return this.isKeyAvailableForBind(code) && !this.isKeyAlreadyBound(code);
    }

    isKeyAvailableForBind(code) {
        let key = this.getKeyInfoByCode(code);
        return !!key;
    }

    bindKeyToAction(name, code) {
        if (!Object.values(this._actionNames).includes(name)) {
            throw new Error(`Attempt to assign code to unknown action: ${name}`);
        }
        for (let keyInfo of this._actionKeysInfo) {
            if (keyInfo.name === name) {
                keyInfo.code = code;
            }
        }
    }

    isKeyAlreadyBound(code) {
        let key = this.getActionKeyInfoByCode(code);
        return !!key;
    }

    getKeyNameByCode(code) {
        let { name } = this.getKeyInfoByCode(code);
        return name;
    }

    getKeyCodeByName(name) {
        for (let keyInfo of this._keysAvailableForBind) {
            let { name:keyName, code } = keyInfo;
            if (name === keyName) {
                return code;
            }
        }
    }

    getKeyInfoByCode(code) {
        for (let keyInfo of this._keysAvailableForBind) {
            let { code:keyCode, name } = keyInfo;
            if (keyCode === code) {
                return keyInfo;
            }
        }
        return null;
    }

    getActionKeyInfoByCode(code) {
        for (let keyInfo of this._actionKeysInfo) {
            let { code:keyCode, action, name } = keyInfo;
            if (keyCode === code) {
                return keyInfo;
            }
        }
        return null;
    }
}

export default KeyboardService;