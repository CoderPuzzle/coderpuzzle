// Problem-provided driver for 2623 memoize. Assembled into every
// submission by the judge ahead of the submitted code; never editable in
// the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The driver owns one case's fnName/actions/values script (the same shape
// as the statement's Input). drive() receives the submission's memoize
// function, builds the underlying function named by fnName, wraps it in a
// call-counting shim, then replays the script against whatever memoize()
// handed back: each "call" passes its arguments through and records the
// return value; each "getCallCount" records how many times the underlying
// function itself was invoked so far. The judged verdict is the recorded
// transcript — one integer per row: call results interleaved with running
// real-call counts.

type MemoTarget = (...args: number[]) => number;

class MemoizeCase {
    fnName: string;
    actions: string[];
    values: number[][];
    outputs: number[];

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (fnName, actions, values) plus the query budget
    // (unused — replaying a bounded script needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [name, actions, scriptValues] = values;
        void _queryBudget;
        this.fnName = name;
        this.actions = actions;
        this.values = scriptValues;
        this.outputs = [];
    }

    private underlying(): MemoTarget {
        if (this.fnName === "sum") {
            return (a: number, b: number): number => a + b;
        }
        if (this.fnName === "fib") {
            const fib = (n: number): number => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));
            return fib as MemoTarget;
        }
        if (this.fnName === "factorial") {
            const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
            return factorial as MemoTarget;
        }
        throw new Error("Unknown fnName: " + this.fnName);
    }

    // Replay this case's script against the submission's memoize function.
    drive(memoizeFn: unknown): void {
        if (typeof memoizeFn !== "function") {
            throw new Error("drive expects the submission's memoize function");
        }
        let calls = 0;
        const target = this.underlying();
        const counting = (...args: number[]): number => {
            calls += 1;
            return target(...args);
        };
        const wrapped = (memoizeFn as (target: MemoTarget) => MemoTarget)(counting);
        if (typeof wrapped !== "function") {
            throw new Error("memoize must return a function");
        }
        for (let at = 0; at < this.actions.length; at++) {
            const action = this.actions[at];
            const args = this.values[at];
            if (action === "call") {
                this.outputs.push(wrapped(...args));
            } else if (action === "getCallCount") {
                this.outputs.push(calls);
            } else {
                throw new Error("Unknown action: " + action);
            }
        }
    }

    verdict(): number[] {
        return this.outputs;
    }
}
