// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   CounterCase carries one case's script: .n is the starting integer and
//   .calls holds one "call" entry per required invocation. drive() is
//   called by the submission with its createCounter — the driver builds
//   the counter with n, invokes it once per entry, and checks each return
//   is an integer. The recorded list of returns, read back by verdict(),
//   is the judged answer.
class CounterCase {
    constructor(values) {
        const [n, calls] = values;
        if (!Number.isInteger(n)) {
            throw new Error("n must be an integer");
        }
        if (!Array.isArray(calls) || calls.some((call) => call !== "call")) {
            throw new Error('calls must be a list of "call" entries');
        }
        this.n = n;
        this.calls = calls;
        this.outputs = [];
    }

    // Replay this case's call count against the submission's closure,
    // recording every value it hands back.
    drive(createCounter) {
        if (typeof createCounter !== "function") {
            throw new Error("drive expects the createCounter function");
        }
        const counter = createCounter(this.n);
        for (let at = 0; at < this.calls.length; at++) {
            const value = counter();
            if (typeof value !== "number" || !Number.isInteger(value)) {
                throw new Error("counter must return an integer on every call");
            }
            this.outputs.push(value);
        }
    }

    verdict() {
        return this.outputs;
    }
}
