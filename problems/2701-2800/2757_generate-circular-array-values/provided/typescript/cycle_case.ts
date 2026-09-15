// Problem-provided driver for 2757 generate-circular-array-values.
// Assembled into every submission by the judge ahead of the submitted
// code; never editable in the editor. This file is the hidden
// implementation — solvers see only the public API documented in the
// statement.
//
// The driver owns one case's arr, startIndex, and steps: drive() calls
// the submission's cycleGenerator with arr and startIndex, takes the
// first parameterless next() (which must yield arr[startIndex]), then
// resumes the generator once per case step by passing that step's jump
// into next(jump), recording every yielded value in order. The judged
// verdict is that collected array — the generator object itself never
// leaves the submission, and since the walk never terminates, any
// result reporting done === true is rejected as a wrong answer.

type CycleFactory = (arr: number[], startIndex: number) => Generator<number>;

class CycleCase {
    private readonly arr: number[];
    private readonly startIndex: number;
    private readonly steps: number[];
    private yields: number[] = [];

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (arr, startIndex, steps) plus the query budget
    // (unused — stepping a generator a fixed number of times needs no
    // call accounting).
    constructor([arr, startIndex, steps]: any[], budget?: any) {
        void budget;
        this.arr = arr;
        this.startIndex = startIndex;
        this.steps = steps;
    }

    // Call the submission's generator factory and walk it: one
    // parameterless next(), then one next(jump) per step value.
    drive(cycleGenerator: CycleFactory): void {
        const iterator = cycleGenerator(this.arr, this.startIndex);
        if (typeof iterator?.next !== "function") {
            throw new Error("cycleGenerator must return a generator");
        }
        let result = iterator.next();
        if (result.done) {
            throw new Error("generator stopped before the first yield");
        }
        this.yields.push(result.value);
        for (const jump of this.steps) {
            result = iterator.next(jump);
            if (result.done) {
                throw new Error(`generator stopped after ${this.yields.length} yields; the walk never ends`);
            }
            this.yields.push(result.value);
        }
    }

    verdict(): number[] {
        return this.yields;
    }
}
