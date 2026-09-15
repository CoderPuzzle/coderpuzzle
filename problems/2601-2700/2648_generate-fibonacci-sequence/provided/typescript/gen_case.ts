// Problem-provided driver for 2648 generate-fibonacci-sequence. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation — solvers
// see only the public API documented in the statement.
//
// The driver owns one case's callCount: drive() calls the submission's
// fibGenerator with no arguments and steps the returned generator exactly
// callCount times by repeated .next() calls, recording every yielded value
// in order. The judged verdict is that collected array — the generator
// object itself never leaves the submission, and since the sequence is
// infinite the driver stops after the case's fixed number of steps.

type FibonacciFactory = () => Generator<number>;

class FibCase {
    readonly callCount: number;
    private yields: number[] = [];

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (callCount) plus the query budget (unused — stepping
    // a generator a fixed number of times needs no call accounting).
    constructor([callCount]: any[], budget?: any) {
        void budget;
        this.callCount = callCount;
    }

    // Call the submission's generator factory with no input and take the
    // first callCount yields. A generator reporting done before callCount
    // steps is a wrong answer, not a stop condition: the true sequence is
    // infinite.
    drive(fibGenerator: FibonacciFactory): void {
        const iterator = fibGenerator();
        if (typeof iterator?.next !== "function") {
            throw new Error("fibGenerator must return a generator");
        }
        for (let step = 0; step < this.callCount; step++) {
            const result = iterator.next();
            if (result.done) {
                throw new Error(`generator stopped after ${step} yields; expected ${this.callCount}`);
            }
            this.yields.push(result.value);
        }
    }

    verdict(): number[] {
        return this.yields;
    }
}
