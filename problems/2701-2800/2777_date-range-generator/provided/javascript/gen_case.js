// Problem-provided driver for 2777 date-range-generator. Assembled into
// every submission by the judge ahead of the submitted code; never editable
// in the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The driver owns one case's (start, end, step) triple: drive() calls the
// submission's dateRangeGenerator with it, steps the returned generator by
// repeated .next() calls until it reports done, and records every yielded
// value in order. The judged verdict is that collected array of strings —
// the generator object itself never leaves the submission.

class GenCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (start, end, step) plus the query budget (unused —
    // stepping a self-terminating generator needs no call accounting).
    constructor([start, end, step], budget) {
        void budget;
        this.start = start;
        this.end = end;
        this.step = step;
        this.yields = [];
    }

    // Call the submission's generator factory with this case's inputs and
    // step it to completion, collecting each yielded value in yield order.
    // The cap only turns a runaway (never-done) generator into a runtime
    // error instead of a hang.
    drive(dateRangeGenerator) {
        const iterator = dateRangeGenerator(this.start, this.end, this.step);
        if (typeof iterator?.next !== "function") {
            throw new Error("dateRangeGenerator must return a generator");
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

    verdict() {
        return this.yields;
    }
}
