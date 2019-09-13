import {MissionsData} from "../Configuration/MissionsData";
import Mission from "./Mission";
import {serviceNames} from "../Configuration/Configuration";

class MissionLists {
    constructor() {
        this.missionsList = [];
        this.missionNames = [];
        this._initMissionList();
        this.name = serviceNames.missionsList;
    }

    _initMissionList() {
        for (let missionData of MissionsData) {
            let {name, map, isLocked} = missionData;
            let mission = new Mission(name, map, isLocked);
            this.missionsList.push(mission);
            this.missionNames.push(name);
        }
    }

    getMissionsData() {
        let data = [];
        for (let missionData of this.missionsList) {
            let {name, isLocked} = missionData;
            data.push({name, isLocked});
        }
        return data;
    }

    getMission(key) {
        if (Number.isInteger(key)) {
            return this._getMissionByNumber(key);
        }
        return this._getMissionByName(key);
    }

    _getMissionByNumber(number) {
        if (!(number > -1 && number < this.missionsList.length)) {
            throw new Error(`Wrong mission number: ${number}`);
        }
        return this.missionsList[number];
    }

    _getMissionByName(name) {
        if (!this.missionNames.includes(name)) {
            throw new Error(`Unknown mission name: ${name}`);
        }
        return this.missionsList.find((mis) => mis.name === name);
    }
}

export default MissionLists;