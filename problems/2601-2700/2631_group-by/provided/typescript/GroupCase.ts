// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   GroupCase exposes the problem's one judged invocation: .fn is the
//   selector built from the case's function source, and .array is the
//   array the submission must group.
type Selector<T> = (item: T) => string;

interface Array<T> {
    groupBy(fn: Selector<T>): Record<string, T[]>;
}

class GroupCase<T = any> {
    fn: Selector<T>;
    array: T[];
    constructor(values: any[], _queryBudget?: unknown) {
        const [source, array] = values;
        this.fn = new Function("return (" + source + ");")() as unknown as Selector<T>;
        this.array = array;
    }
}
