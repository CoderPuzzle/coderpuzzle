// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   ReduceCase exposes the problem's one judged invocation: .fn is the
//   reducer built from the case's function source, .nums is the integer
//   array to fold, and .init is the initial accumulator value.
class ReduceCase {
    fn: (accum: number, curr: number) => number;
    nums: number[];
    init: number;
    constructor(values: any[], _queryBudget?: unknown) {
        const [fn, nums, init] = values;
        this.fn = new Function("return (" + fn + ");")() as unknown as (accum: number, curr: number) => number;
        this.nums = nums;
        this.init = init;
    }
}
