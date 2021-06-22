function Parser() {
    function parseArrayToObject(keys, values) {
        const obj = {};
        for (const [i, key] of keys.entries()) {
            obj[key] = values[i];
        }
        return obj;
    }

    function transformDates(object, fieldsToTransform) {
        const changes = {};
        
        for (const field of fieldsToTransform) {
            changes[field] = new Date(object[field]);
        }

        return Object.assign({}, object, changes);
    }

    return {parseArrayToObject, transformDates};
}

export { Parser };
