interface Function {
    callPolyfill(context: object, ...args: any[]): any;
}

class Solution {
    callWithContext(callCase: CallCase): string {
        // Enhance every function with callPolyfill: it installs the
        // function on the context object under a freshly created symbol
        // and invokes it there. A method call always makes its object the
        // receiver, so context becomes this exactly as the built-in call
        // promises — and a symbol can never collide with an existing
        // property (string keys or other symbols), so the temporary slot
        // neither clobbers state nor leaks between calls.
        Function.prototype.callPolyfill = function (context: object, ...args: any[]): any {
            const fn = this as (...args: any[]) => any;
            const slot = Symbol("callPolyfill");
            const receiver = context as Record<PropertyKey, unknown>;
            receiver[slot] = fn;
            try {
                return (receiver[slot] as (...args: any[]) => any)(...args);
            } finally {
                delete receiver[slot];
            }
        };
        return callCase.fn.callPolyfill(callCase.obj, ...callCase.inputs);
    }
}
