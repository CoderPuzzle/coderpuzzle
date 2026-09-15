// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   MapCase exposes the problem's one judged invocation: .arr is the
//   integer array under test and .fn is the callable built from the
//   case's function source.
class MapCase {
    constructor(values) {
        const [arr, source] = values;
        this.arr = arr;
        this.fn = new Function("return (" + source + ");")();
    }
}
