class Solution {
    callMethod(methodCase: MethodCase): string {
        const obj = createInfiniteObject();
        return obj[methodCase.method]();
    }
}

// The infinite-method object: a Proxy whose get trap answers EVERY
// property lookup — including inherited-looking names like "constructor"
// or "__proto__" — with a function closing over the looked-up name, so
// calling any method yields that method's own name.
function createInfiniteObject(): Record<string, () => string> {
    return new Proxy({} as Record<string, () => string>, {
        get(_target, prop: string | symbol) {
            return () => String(prop);
        },
    });
}
