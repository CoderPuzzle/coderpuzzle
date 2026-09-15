// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   FilterCase exposes the problem's one judged invocation: .arr is the
//   integer array under test and .fn is the callable built from the
//   case's function source.
class FilterCase {
    arr: number[];
    fn: (...args: any[]) => any;
    constructor(values: any[], _queryBudget?: unknown) {
        const [arr, source] = values;
        this.arr = arr;
        this.fn = new Function("return (" + source + ");")() as unknown as (...args: any[]) => any;
    }
}
