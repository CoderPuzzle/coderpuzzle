// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   MethodCase exposes the problem's one judged invocation: .method is the
//   name of the method the judge observes being called on an
//   infinite-method object.
class MethodCase {
    method: string;
    constructor(values: any[], _queryBudget?: unknown) {
        const [method] = values;
        this.method = method;
    }
}
