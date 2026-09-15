// Problem-provided driver for 2803 factorial-generator. Assembled into
// every submission by the judge ahead of the submitted code; never editable
// in the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The driver owns one case's n: drive() calls the submission's factorial
// with it, steps the returned generator by repeated .next() calls until it
// reports done, and records every yielded value in order. The judged
// verdict is that collected array of numbers — the generator object itself
// never leaves the submission.

type FactorialFactory = (n: number) => Generator<number>;

class GenCase {
    readonly n: number;
    private yields: number[] = [];

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (n) plus the query budget (unused — stepping a
    // self-terminating generator needs no call accounting).
    constructor([n]: any[], budget?: any) {
        void budget;
        this.n = n;
    }

    // Call the submission's generator factory with this case's input and
    // step it to completion, collecting each yielded value in yield order.
    // The cap only turns a runaway (never-done) generator into a runtime
    // error instead of a hang.
    drive(factorial: FactorialFactory): void {
        const iterator = factorial(this.n);
        if (typeof iterator?.next !== "function") {
            throw new Error("factorial must return a generator");
        }
        for (let steps = 0; ; steps++) {
            if (steps > 100000) {
                throw new Error("Generator did not terminate within 100000 next() calls");
            }
            const result = iterator.next();
            if (result.done) break;
            this.yields.push(result.value);
        }
    }

    verdict(): number[] {
        return this.yields;
    }
}
