// One explicit worklist of value pairs replaces call-stack recursion:
// nesting here reaches 1000 by constraint, and an array-based queue keeps
// the traversal flat regardless. Pairs whose sides pass === (equal
// primitives or shared references) drop out immediately; anything left
// must be a same-shaped pair of containers — array/array or plain
// object/plain object, never crossed — otherwise it fails fast. Objects
// compare their sorted-free key sets through size plus membership so key
// insertion order can never matter, and every surviving child pair goes
// back onto the stack until nothing differs.
function deepEqual(o1: JsonValue, o2: JsonValue): boolean {
    const pending: [JsonValue, JsonValue][] = [[o1, o2]];
    while (pending.length > 0) {
        const [a, b] = pending.pop() as [JsonValue, JsonValue];
        if (a === b) {
            continue;
        }
        const aIsArray = Array.isArray(a);
        const bIsArray = Array.isArray(b);
        if (aIsArray !== bIsArray) {
            return false;
        }
        if (aIsArray) {
            const first = a as JsonValue[];
            const second = b as JsonValue[];
            if (first.length !== second.length) {
                return false;
            }
            for (let i = 0; i < first.length; i++) {
                pending.push([first[i], second[i]]);
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
        const first = a as { [key: string]: JsonValue };
        const second = b as { [key: string]: JsonValue };
        const keysA = Object.keys(first);
        const keysB = new Set(Object.keys(second));
        if (keysA.length !== keysB.size) {
            return false;
        }
        for (const key of keysA) {
            if (!keysB.has(key)) {
                return false;
            }
            pending.push([first[key], second[key]]);
        }
    }
    return true;
}

class Solution {
    deepEqual(deepEqualCase: DeepEqualCase): boolean {
        return deepEqual(deepEqualCase.o1, deepEqualCase.o2);
    }
}
