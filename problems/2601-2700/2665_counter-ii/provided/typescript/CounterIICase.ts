// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   CounterIICase carries one case's script: .init is the starting integer
//   and .calls holds one method name per required invocation. drive() is
//   called by the submission with its createCounter — the driver builds the
//   counter object with init, invokes the requested method once per entry,
//   and checks each return is an integer. The recorded list of returns,
//   read back by verdict(), is the judged answer.
type CounterFactory = (start: number) => { increment: () => number; decrement: () => number; reset: () => number };

class CounterIICase {
    readonly init: number;
    private readonly calls: string[];
    private outputs: number[] = [];

    constructor(values: any[], _queryBudget?: unknown) {
        const [init, calls] = values;
        if (!Number.isInteger(init)) {
            throw new Error("init must be an integer");
        }
        const valid = new Set(["increment", "decrement", "reset"]);
        if (!Array.isArray(calls) || calls.some((call) => !valid.has(call))) {
            throw new Error('calls must be a list of "increment", "decrement" or "reset" entries');
        }
        this.init = init as number;
        this.calls = calls as string[];
    }

    get callCount(): number {
        return this.calls.length;
    }

    // Replay this case's schedule against the submission's factory,
    // recording every value its counter hands back.
    drive(createCounter: CounterFactory): void {
        const counter = createCounter(this.init);
        for (let at = 0; at < this.calls.length; at++) {
            const value = counter[this.calls[at]]();
            if (typeof value !== "number" || !Number.isInteger(value)) {
                throw new Error("counter methods must return an integer on every call");
            }
            this.outputs.push(value);
        }
    }

    verdict(): number[] {
        return this.outputs;
    }
}
