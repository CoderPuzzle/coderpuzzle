// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   FnCase exposes the problem's one judged invocation: .fn is the
//   callable built from the case's function source, .obj is the binding
//   target, and .inputs holds the arguments for that single call.
class FnCase {
    constructor(values) {
        const [source, obj, inputs] = values;
        this.fn = new Function("return (" + source + ");")();
        this.obj = obj;
        this.inputs = inputs;
    }
}
