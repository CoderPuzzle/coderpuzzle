// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   ExpectCase exposes the problem's one judged invocation: .func is the
//   case's thunk source — an arrow function of the submission's global
//   expect — and drive() runs that thunk to completion, catching any
//   thrown error. verdict() is the recorded outcome: {"value": <v>} when
//   the thunk returned normally, {"error": "<message>"} when it threw.
type ExpectOutcome = { value: any } | { error: string };

class ExpectCase {
    func: string;
    outcome: ExpectOutcome | null;
    constructor(values: any[], _queryBudget?: unknown) {
        const [func] = values;
        this.func = func;
        this.outcome = null;
    }

    // Build the case's thunk with the submission's expect in scope, call
    // it, and record what the tested expression produced. Compiling the
    // thunk stays outside the try so a malformed source surfaces as a
    // runtime error rather than a verdict.
    drive(expect: (val: any) => unknown): void {
        const thunk = new Function("expect", "return (" + this.func + ");")(expect) as () => any;
        try {
            this.outcome = { value: thunk() };
        } catch (problem) {
            this.outcome = {
                error: problem instanceof Error ? problem.message : String(problem),
            };
        }
    }

    verdict(): ExpectOutcome {
        return this.outcome as ExpectOutcome;
    }
}
