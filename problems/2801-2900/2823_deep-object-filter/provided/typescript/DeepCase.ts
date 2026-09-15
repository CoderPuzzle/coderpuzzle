// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   DeepCase exposes the problem's one judged invocation: .obj is the
//   case's JSON object or array and .fn is the callable built from the
//   case's function source. drive(deepFilter) hands the submission's
//   deepFilter that pair once and records what it returned; verdict()
//   hands the recorded answer to the judge — the filtered object or
//   array verbatim, with the documented "no valid data left" outcome
//   recorded as JSON null.
type DeepCasePredicate = (value: any) => boolean;

class DeepCase {
    readonly obj: any;
    readonly fn: DeepCasePredicate;
    private filtered: any;
    private driven: boolean;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (obj, fn source) plus the query budget (unused — a
    // single drive() call needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [obj, source] = values;
        this.obj = obj;
        this.fn = new Function("return (" + source + ");")() as unknown as DeepCasePredicate;
        this.filtered = null;
        this.driven = false;
    }

    drive(deepFilter: (obj: any, fn: DeepCasePredicate) => any): void {
        if (typeof deepFilter !== "function") {
            throw new Error("drive expects the deepFilter function");
        }
        const result = deepFilter(this.obj, this.fn);
        this.filtered = result === undefined ? null : result;
        this.driven = true;
    }

    verdict(): any {
        if (!this.driven) {
            throw new Error("deepCase.drive(deepFilter) was never called");
        }
        return this.filtered;
    }
}
