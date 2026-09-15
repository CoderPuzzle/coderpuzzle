// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   CurryCase exposes the problem's one judged invocation: .fn is the
//   callable built from the case's function source, and .inputs holds the
//   ordered argument batches the curried chain must consume.
type AnyFn = (...args: any[]) => any;

class CurryCase {
    fn: AnyFn;
    inputs: any[][];
    constructor(values: any[], _queryBudget?: unknown) {
        const [source, inputs] = values;
        this.fn = new Function("return (" + source + ");")() as unknown as AnyFn;
        this.inputs = inputs;
    }
}
