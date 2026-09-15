// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   ReduceCase exposes the problem's one judged invocation: .fn is the
//   reducer built from the case's function source, .nums is the integer
//   array to fold, and .init is the initial accumulator value.
class ReduceCase {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (fn, nums, init) plus the query budget (unused — a
    // single synchronous call needs no call accounting).
    constructor([fn, nums, init], budget) {
        void budget;
        this.fn = new Function("return (" + fn + ");")();
        this.nums = nums;
        this.init = init;
    }
}
