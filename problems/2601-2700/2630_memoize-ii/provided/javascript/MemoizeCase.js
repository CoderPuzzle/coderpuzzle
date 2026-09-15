// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   MemoizeCase exposes the problem's one judged invocation: .source is
//   the source text of the tested function fn, and .getInputs is the
//   source text of a zero-argument function that builds the argument
//   lists for the memoized replay.
class MemoizeCase {
    constructor(values) {
        const [source, getInputs] = values;
        this.fn = new Function("return (" + source + ");")();
        this.buildInputs = new Function("return (" + getInputs + ");")();
    }
}
