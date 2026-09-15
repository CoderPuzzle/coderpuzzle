// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   JsonCase exposes the problem's one judged invocation: .object is the
//   live decoded value to serialize, with property order exactly as listed
//   in the case data.
type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

class JsonCase {
    object: JsonValue;
    constructor(values: any[], _queryBudget?: unknown) {
        const [object] = values;
        this.object = object;
    }
}
