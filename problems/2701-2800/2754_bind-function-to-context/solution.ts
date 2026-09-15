interface Function {
    bindPolyfill(context: object): (...args: any[]) => any;
}

class Solution {
    bindWithContext(fnCase: FnCase): string {
        // Enhance every function with bindPolyfill: it returns a wrapper
        // that, per call, installs the function on the target object under
        // a freshly created symbol and calls it there. A method call always
        // makes its object the receiver, so context becomes this exactly as
        // real bind promises — and a symbol can never collide with an
        // existing property (string keys or other symbols), so the
        // temporary slot neither clobbers state nor leaks between calls.
        Function.prototype.bindPolyfill = function (context: object): (...args: any[]) => any {
            const fn = this as (...args: any[]) => any;
            const slot = Symbol("bindPolyfill");
            const receiver = context as Record<PropertyKey, unknown>;
            return (...args: any[]): any => {
                receiver[slot] = fn;
                try {
                    return (receiver[slot] as (...args: any[]) => any)(...args);
                } finally {
                    delete receiver[slot];
                }
            };
        };
        return fnCase.fn.bindPolyfill(fnCase.obj)(...fnCase.inputs);
    }
}
