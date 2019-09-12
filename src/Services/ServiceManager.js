import {serviceNames} from "../Configuration/Configuration";

class ServiceManager {
    constructor(...args) {
        this.dependencyInstances = null;
        this._fillDependenciesObject(...args);
    }

    set screenFlowCallbacks(callbacks) {
        this.dependencyInstances[serviceNames.screenFlowCallbacks] = callbacks;
    }

    resolveDependencies(screenName, requiredDependencies) {
        let dependencies = [];
        if (requiredDependencies.length === 0){
            return null;
        }
        for (let dependencyName of requiredDependencies) {
            if (!Object.values(serviceNames).includes(dependencyName)) {
                throw new Error(`Unknown dependency name: ${dependencyName} for screen: ${screenName}`);
            }
            let dependencyInstance = this.dependencyInstances[dependencyName];
            dependencies.push(dependencyInstance);
        }
        return dependencies;
    }

    _fillDependenciesObject(...args) {
        this.dependencyInstances = {};
        for (let dependency of args) {
            this.dependencyInstances[dependency.name] = dependency;
        }
    }
}

export default ServiceManager;