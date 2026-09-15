// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   DeepEqualCase exposes the problem's one judged invocation: .o1 and
//   .o2 are genuine JavaScript values produced by JSON.parse of the
//   case's raw text, exactly as the statement quotes.
type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

class DeepEqualCase {
    o1: JsonValue;
    o2: JsonValue;
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (the two raw texts) plus the query budget (unused —
    // a single synchronous call needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [o1Text, o2Text] = values;
        this.o1 = JSON.parse(o1Text) as JsonValue;
        this.o2 = JSON.parse(o2Text) as JsonValue;
    }
}
