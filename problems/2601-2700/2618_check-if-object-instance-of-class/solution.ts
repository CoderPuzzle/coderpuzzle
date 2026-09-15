function checkIfInstanceOf(obj: any, classFunction: any): boolean {
    // Walk the prototype chain of the value until it reaches the class's
    // prototype. Object.getPrototypeOf boxes primitives automatically, so
    // 5 reaches Number.prototype exactly like an object would; null and
    // undefined must be rejected first because they have no prototype at
    // all, and a non-function or arrow-function second argument has no
    // usable .prototype to match against.
    if (obj === null || obj === undefined) return false;
    if (typeof classFunction !== "function") return false;
    const target = classFunction.prototype;
    if (target === undefined || target === null) return false;
    let current = Object.getPrototypeOf(obj);
    while (current !== null && current !== undefined) {
        if (current === target) return true;
        current = Object.getPrototypeOf(current);
    }
    return false;
}

class Solution {
    solve(instanceOfCase: InstanceOfCase): boolean {
        return checkIfInstanceOf(instanceOfCase.obj, instanceOfCase.cls);
    }
}
