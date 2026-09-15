// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   DiffCase exposes one judged comparison: .obj1 and .obj2 are the two
//   deeply nested structures under test; drive(objDiff) invokes the
//   submission's differ once with that pair and records its return, and
//   the recorded object is what the judge scores.
type Differ = (obj1: any, obj2: any) => any;

class DiffCase {
    readonly obj1: any;
    readonly obj2: any;
    private recorded: any;
    private driven = false;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (obj1, obj2) plus the query budget (unused — a
    // single drive() call needs no call accounting).
    constructor(values: any[], budget?: any) {
        void budget;
        const [obj1, obj2] = values;
        this.obj1 = obj1;
        this.obj2 = obj2;
        this.recorded = undefined;
    }

    drive(objDiff: Differ): void {
        if (typeof objDiff !== "function") {
            throw new Error("drive expects the objDiff function");
        }
        const result = objDiff(this.obj1, this.obj2);
        if (result === null || result === undefined || typeof result !== "object" || Array.isArray(result)) {
            throw new Error("objDiff must return an object");
        }
        this.recorded = result;
        this.driven = true;
    }

    verdict(): any {
        if (!this.driven) {
            throw new Error("diffCase.drive(objDiff) was never called");
        }
        return this.recorded;
    }
}
