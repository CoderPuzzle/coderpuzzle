// bundle-provided driver for 2629 function composition. Assembled into
// every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation —
// solvers see only the public API documented in the statement.
//
// The driver owns one case's functions/x script (the same shape as the
// statement's Input). drive() receives the submission's compose function,
// builds each case source into a live callable, wraps every callable in a
// counting shim, and hands the wrapped array to compose(). It requires a
// function back, calls that composed function once at x, and records the
// returned integer. verdict() then insists every supplied function was
// called exactly once — threading an input through the whole chain is the
// problem's contract — before reporting the recorded value.

class ComposeCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (functions, x) plus the query budget (unused — a
    // single one-shot evaluation needs no call accounting).
    constructor([functions, x], budget) {
        void budget;
        this.x = x;
        this.callCounts = new Array(functions.length).fill(0);
        this.functions = functions.map((source, index) => {
            const inner = new Function("return (" + source + ");")();
            return (value) => {
                this.callCounts[index] += 1;
                return inner(value);
            };
        });
        this.result = undefined;
    }

    drive(compose) {
        const composed = compose(this.functions);
        if (typeof composed !== "function") {
            throw new Error("compose must return a function");
        }
        const value = composed(this.x);
        if (!Number.isInteger(value)) {
            throw new Error("composition must return an integer, got " + String(value));
        }
        this.result = value;
    }

    verdict() {
        if (this.result === undefined && this.functions.length > 0) {
            throw new Error("the composed function was never evaluated");
        }
        for (let index = 0; index < this.callCounts.length; ++index) {
            if (this.callCounts[index] !== 1) {
                throw new Error(
                    "function " + index + " was called " + this.callCounts[index] + " times, expected exactly once",
                );
            }
        }
        return this.result;
    }
}
