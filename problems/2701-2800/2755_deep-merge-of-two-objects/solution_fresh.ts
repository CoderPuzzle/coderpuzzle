function deepMerge(obj1: any, obj2: any): any {
    // The plain-object probe must reject null: typeof null is "object",
    // yet null is a leaf under the take-obj2 rule. Own-key checks keep
    // inherited names like "constructor" from masquerading as keys.
    const isObject = (value: any): boolean => typeof value === "object" && value !== null && !Array.isArray(value);
    const owns = (object: any, key: string): boolean => Object.prototype.hasOwnProperty.call(object, key);

    // Only same-kind containers merge further; every other pairing — an
    // object meeting an array included — falls to the take-obj2 rule.
    if (isObject(obj1) && isObject(obj2)) {
        const merged: Record<string, any> = {};
        for (const key of Object.keys(obj1)) {
            merged[key] = owns(obj2, key) ? deepMerge(obj1[key], obj2[key]) : obj1[key];
        }
        for (const key of Object.keys(obj2)) {
            if (!owns(obj1, key)) {
                merged[key] = obj2[key];
            }
        }
        return merged;
    }
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        const merged: any[] = new Array(Math.max(obj1.length, obj2.length));
        for (let index = 0; index < merged.length; index++) {
            const inFirst = index < obj1.length;
            const inSecond = index < obj2.length;
            merged[index] =
                inFirst && inSecond ? deepMerge(obj1[index], obj2[index]) : inFirst ? obj1[index] : obj2[index];
        }
        return merged;
    }
    return obj2;
}
