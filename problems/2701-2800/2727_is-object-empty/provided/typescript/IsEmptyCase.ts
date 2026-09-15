// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   IsEmptyCase exposes .obj as the genuine JavaScript value produced by
//   JSON.parse of the case's raw text, exactly as the statement promises.
type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type JsonContainer = JsonValue[] | { [key: string]: JsonValue };

class IsEmptyCase {
    obj: JsonContainer;
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values plus the query budget (unused — this problem makes
    // one synchronous call and needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [objText] = values;
        this.obj = JSON.parse(objText) as JsonContainer;
    }
}
