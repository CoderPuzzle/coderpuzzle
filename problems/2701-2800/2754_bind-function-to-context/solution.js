class Solution {
    bindWithContext(fnCase) {
        // Enhance every function with bindPolyfill: it returns a wrapper
        // that, per call, installs the function on the target object under
        // a freshly created symbol and calls it there. A method call always
        // makes its object the receiver, so context becomes this exactly as
        // real bind promises — and a symbol can never collide with an
        // existing property (string keys or other symbols), so the
        // temporary slot neither clobbers state nor leaks between calls.
        Function.prototype.bindPolyfill = function (context) {
            const fn = this;
            const slot = Symbol("bindPolyfill");
            return function (...args) {
                context[slot] = fn;
                try {
                    return context[slot](...args);
                } finally {
                    delete context[slot];
                }
            };
        };
        return fnCase.fn.bindPolyfill(fnCase.obj)(...fnCase.inputs);
    }
}
