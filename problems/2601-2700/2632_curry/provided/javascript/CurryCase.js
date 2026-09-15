// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   CurryCase exposes the problem's one judged invocation: .fn is the
//   callable built from the case's function source, and .inputs holds the
//   ordered argument batches the curried chain must consume.
class CurryCase {
    constructor(values) {
        const [source, inputs] = values;
        this.fn = new Function("return (" + source + ");")();
        this.inputs = inputs;
    }
}
