class Solution {
    callWithContext(callCase) {
        // Enhance every function with callPolyfill: it installs the
        // function on the context object under a freshly created symbol
        // and invokes it there. A method call always makes its object the
        // receiver, so context becomes this exactly as the built-in call
        // promises — and a symbol can never collide with an existing
        // property (string keys or other symbols), so the temporary slot
        // neither clobbers state nor leaks between calls.
        Function.prototype.callPolyfill = function (context, ...args) {
            const fn = this;
            const slot = Symbol("callPolyfill");
            context[slot] = fn;
            try {
                return context[slot](...args);
            } finally {
                delete context[slot];
            }
        };
        return callCase.fn.callPolyfill(callCase.obj, ...callCase.inputs);
    }
}
