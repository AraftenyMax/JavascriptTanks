import InvokableFactory from "./Factory/InvokableFactory";
import {SERVICES} from "../Configuration/Configuration";

class ServiceManager {
    services = {};
    factories = {};
    invokable = {};

    constructor(config) {
        this.configure(config);
    }

    _validateConfig(config) {
        if (!config) {
            throw new Error('Empty config is passed.');
        }
        return true;
    }

    configure(config) {
        if (!this._validateConfig(config)) {
            throw new Error('Config, passed to ServiceManager is invalid.');
        }
        if (config.services) {
            this.services = {
                ...this.services,
                ...config.services,
            };
        }

        if (config.invokable) {
            const factories = this.createFactoriesForInvokable(config.invokable);
            this.factories = {
                ...this.factories,
                ...factories,
            };
        }

        if (config.factories) {
            this.factories = {
                ...this.factories,
                ...config.factories,
            };
        }
    }

    createFactoriesForInvokable(invokable) {
        const factories = {};
        for (let key in invokable) {
            factories[key] = InvokableFactory;
        }
        return factories;
    }

    _validateServiceName(serviceName) {
        return Object.values(SERVICES).includes(serviceName);
    }

    getFactory(serviceName) {
        if (!this._validateServiceName(serviceName)) {
            throw new Error(`Attempt to get factory for unknown service: ${serviceName}`);
        }
        return this.factories[serviceName];
    }

    getService(name, options) {
        if (name in this.services) {
            return this.services[name];
        }
        return this.createService(name, options);
    }

    createService(name, options) {
        if (!this._validateServiceName(name)) {
            throw new Error(`Attempt to create service instance for unknown name: ${name}`);
        }
        try {
            let factory = this.getFactory(name);
            let service = factory(this, name, options);
            return service;
        } catch (e) {
            throw new Error(
                `Service with name ${name} could not be created. Reason: ${e.message}`
            );
        }
    }
}

export default ServiceManager;