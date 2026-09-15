// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   StrCase exposes the problem's one judged invocation: .str is the
//   string under test and .times is the count replicate(x) must return
//   it repeated by.
class StrCase {
    constructor(values) {
        const [str, times] = values;
        this.str = str;
        this.times = times;
    }
}
