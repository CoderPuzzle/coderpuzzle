// Problem-provided driver for 2666 allow-one-function-call. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation —
// solvers see only the public API documented in the statement.
//
// The driver owns one case's fn/calls script (the same shape as the
// statement's Input). drive() receives the submission's once function,
// builds the underlying function named by the case's source string,
// wraps it in a call-counting shim, then replays the calls rows through
// whatever once() handed back: row 0 must return the shim's recorded
// result, and every later row must come back as undefined or the run is
// rejected. The judged verdict is [{"calls": K, "value": V}] — how many
// times the underlying function itself was invoked, and what that one
// invocation returned.

class OnceCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (fn, calls) plus the query budget (unused —
    // replaying a bounded script needs no call accounting).
    constructor([fnSource, calls], budget) {
        void budget;
        this.fnSource = fnSource;
        this.calls = calls;
    }

    _underlying() {
        return new Function("return (" + this.fnSource + ");")();
    }

    // Replay this case's rows against the submission's once function.
    drive(onceFn) {
        if (typeof onceFn !== "function") {
            throw new Error("drive expects the submission's once function");
        }
        let realCalls = 0;
        let value;
        const target = this._underlying();
        const counting = (...args) => {
            realCalls += 1;
            value = target(...args);
            return value;
        };
        const wrapped = onceFn(counting);
        if (typeof wrapped !== "function") {
            throw new Error("once must return a function");
        }
        for (let at = 0; at < this.calls.length; at++) {
            const out = wrapped(...this.calls[at]);
            if (at > 0 && out !== undefined) {
                throw new Error("call " + at + " returned a non-undefined value");
            }
        }
        this.verdictValue = [{ calls: realCalls, value: value }];
    }

    verdict() {
        return this.verdictValue;
    }
}
