// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   GroupCase exposes the problem's one judged invocation: .fn is the
//   selector built from the case's function source, and .array is the
//   array the submission must group.
class GroupCase {
    constructor(values) {
        const [source, array] = values;
        this.fn = new Function("return (" + source + ");")();
        this.array = array;
    }
}
