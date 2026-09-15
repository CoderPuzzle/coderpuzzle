function deepMerge(obj1: any, obj2: any): any {
    // The plain-object probe must reject null: typeof null is "object",
    // yet null is a leaf under the take-obj2 rule. Own-key checks keep
    // inherited names like "constructor" from masquerading as keys.
    const isObject = (value: any): boolean => typeof value === "object" && value !== null && !Array.isArray(value);
    const owns = (object: any, key: string): boolean => Object.prototype.hasOwnProperty.call(object, key);

    // Only same-kind containers merge further; every other pairing — an
    // object meeting an array included — falls to the take-obj2 rule.
    if (isObject(obj1) && isObject(obj2)) {
        for (const key of Object.keys(obj2)) {
            obj1[key] = owns(obj1, key) ? deepMerge(obj1[key], obj2[key]) : obj2[key];
        }
        return obj1;
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        for (let index = 0; index < obj2.length; index++) {
            // obj2's surplus indices extend obj1 as they are written;
            // obj1's surplus entries already hold the answer untouched.
            obj1[index] = index < obj1.length ? deepMerge(obj1[index], obj2[index]) : obj2[index];
        }
        return obj1;
    }
    return obj2;
}
