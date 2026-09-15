// One explicit worklist of value pairs replaces call-stack recursion:
// nesting here reaches 1000 by constraint, and an array-based queue keeps
// the traversal flat regardless. Pairs whose sides pass === (equal
// primitives or shared references) drop out immediately; anything left
// must be a same-shaped pair of containers — array/array or plain
// object/plain object, never crossed — otherwise it fails fast. Objects
// compare their sorted-free key sets through size plus membership so key
// insertion order can never matter, and every surviving child pair goes
// back onto the stack until nothing differs.
function deepEqual(o1, o2) {
    const pending = [[o1, o2]];
    while (pending.length > 0) {
        const [a, b] = pending.pop();
        if (a === b) {
            continue;
        }
        const aIsArray = Array.isArray(a);
        const bIsArray = Array.isArray(b);
        if (aIsArray !== bIsArray) {
            return false;
        }
        if (aIsArray) {
            if (a.length !== b.length) {
                return false;
            }
            for (let i = 0; i < a.length; i++) {
                pending.push([a[i], b[i]]);
            }
            continue;
        }
        const aIsObject = a !== null && typeof a === "object";
        const bIsObject = b !== null && typeof b === "object";
        if (aIsObject !== bIsObject) {
            return false;
        }
        if (!aIsObject) {
            return false; // distinct primitives never become equal
        }
        const keysA = Object.keys(a);
        const keysB = new Set(Object.keys(b));
        if (keysA.length !== keysB.size) {
            return false;
        }
        for (const key of keysA) {
            if (!keysB.has(key)) {
                return false;
            }
            pending.push([a[key], b[key]]);
        }
    }
    return true;
}

class Solution {
    deepEqual(deepEqualCase) {
        return deepEqual(deepEqualCase.o1, deepEqualCase.o2);
    }
}
