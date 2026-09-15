// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   MemoizeCase exposes the problem's one judged invocation: .fn is the
//   callable built from the case's function source, and .buildInputs
//   builds the array of argument lists for the memoized replay.
class MemoizeCase {
    fn: (...args: any[]) => any;
    buildInputs: () => any[][];
    constructor(values: any[], _queryBudget?: unknown) {
        const [source, getInputs] = values;
        this.fn = new Function("return (" + source + ");")() as unknown as (...args: any[]) => any;
        this.buildInputs = new Function("return (" + getInputs + ");")() as unknown as () => any[][];
    }
}
