// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   JsonCase exposes the problem's one judged invocation: .object is the
//   live decoded value to serialize, with property order exactly as listed
//   in the case data.
class JsonCase {
    constructor(values) {
        const [object] = values;
        this.object = object;
    }
}
