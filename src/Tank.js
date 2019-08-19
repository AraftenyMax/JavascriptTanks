import {weaponTypes, armourTypes, mapMarkers, moveSpeeds} from './Constants';


class Tank {
    constructor(coordinates = {x = 0, y = 0}, health = 100, marker = mapMarkers.default) {
        this.coordinates = {
            x: coordinates.x,
            y: coordinates.y
        }
        this.health = health;
        this.mapMarker = marker;
        this.weaponType = weaponTypes.default;
        this.armourType = armourType.default;
        this.bonuses = [];
        this.mapMarker = mapMarkers.empty;
        this.damage = this.weaponType.damage;
        this.armourType = armourTypes.default;
        this.defense = this.armourType.defense;
        this.moveSpeed = moveSpeeds.low;
        this.cannonRotation = 0;
        this.reloadCooldown = this.weaponType.reloadCooldown;
        this.isReloading = false;
    }

    move() {

    }

    fire() {

    }

    isAlive() {
        return this.health > 0;
    }

    applyBonus(bonus) {

    }

    setReloadTimeout() {

    }

    
}