// Problem-provided driver for 2667 create-hello-world-function.
// Assembled into every submission by the judge ahead of the submitted
// code; never editable in the editor. This file is the hidden
// implementation — solvers see only the public API documented in the
// statement.
//
// The driver owns one case's calls script (the same shape as the
// statement's Input). drive() receives the submission's createHelloWorld
// factory, builds the returned function once, then replays each row of
// arguments through it and records whatever value comes back — a correct
// function answers "Hello World" every time, no matter what the rows
// carry. The recorded list is the judged verdict.

class HelloWorldCase {
    calls: unknown[][];
    outputs: unknown[];

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (calls) plus the query budget (unused — replaying a
    // bounded script needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [calls] = values;
        void _queryBudget;
        if (!Array.isArray(calls) || calls.some((row) => !Array.isArray(row))) {
            throw new Error("calls must be a list of argument rows");
        }
        this.calls = calls;
        this.outputs = [];
    }

    // Replay this case's rows through the factory's returned function.
    drive(createHelloWorld: unknown): void {
        if (typeof createHelloWorld !== "function") {
            throw new Error("drive expects the createHelloWorld function");
        }
        const sayHello = (createHelloWorld as () => (...args: unknown[]) => unknown)();
        if (typeof sayHello !== "function") {
            throw new Error("createHelloWorld must return a function");
        }
        for (let at = 0; at < this.calls.length; at++) {
            this.outputs.push(sayHello(...(this.calls[at] as unknown[])));
        }
    }

    verdict(): unknown[] {
        return this.outputs;
    }
}
