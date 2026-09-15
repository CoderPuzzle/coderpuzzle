// deepFilter works in one bottom-up sweep. A leaf (number, string,
// boolean, or null — JSON's non-container values) stands or falls by
// calling fn directly: a true verdict keeps the value, false drops it.
// An array or object is never tested with fn at all — Example 3 keeps
// [-1, -1, 5, -1, 10] even though fn says false for every array — it is
// rebuilt from its recursively filtered members, and if nothing survives
// the container disappears, so emptiness prunes upward level by level.
function deepFilter(obj: any, fn: (value: any) => boolean): any {
    if (Array.isArray(obj)) {
        const survivors: any[] = [];
        for (let index = 0; index < obj.length; ++index) {
            const kept = deepFilter(obj[index], fn);
            if (kept !== undefined) {
                survivors.push(kept);
            }
        }
        return survivors.length > 0 ? survivors : undefined;
    }
    if (obj !== null && typeof obj === "object") {
        const survivors: Record<string, any> = {};
        const keys = Object.keys(obj);
        for (let index = 0; index < keys.length; ++index) {
            const key: string = keys[index];
            const kept = deepFilter(obj[key], fn);
            if (kept !== undefined) {
                survivors[key] = kept;
            }
        }
        return Object.keys(survivors).length > 0 ? survivors : undefined;
    }
    return fn(obj) ? obj : undefined;
}

class Solution {
    solve(deepCase: DeepCase): void {
        deepCase.drive(deepFilter);
    }
}
