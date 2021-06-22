const serviceRepository = new Map();

function registerService(name, serviceCreator) {
    serviceRepository.set(name, serviceCreator());
}

function service(name) {
    if (serviceRepository.has(name)) {
        return serviceRepository.get(name);
    }
    
    return null;
}

function registerServices(servicesObject) {
    for (const [name, serviceCreator] of Object.entries(servicesObject)) {
        registerService(name, serviceCreator);
    }
}

function services(...names) {
    return names.map(name => service(name));
}

export { registerService, service, registerServices, services };