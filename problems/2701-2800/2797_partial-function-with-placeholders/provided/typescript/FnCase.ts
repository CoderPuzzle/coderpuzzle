// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   FnCase exposes the problem's one judged invocation: .fn is the
//   callable built from the case's function source, .args is the prefilled
//   argument list, and .restArgs holds the arguments of that single call.
class FnCase {
    fn: (...args: any[]) => any;
    args: any[];
    restArgs: any[];
    constructor(values: any[], _queryBudget?: unknown) {
        const [source, args, restArgs] = values;
        this.fn = new Function("return (" + source + ");")() as unknown as (...args: any[]) => any;
        this.args = args;
        this.restArgs = restArgs;
    }
}
