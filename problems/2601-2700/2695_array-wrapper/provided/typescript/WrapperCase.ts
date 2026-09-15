// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   WrapperCase exposes the problem's one judged invocation: .arrays
//   holds the constructor argument of each ArrayWrapper instance under
//   test and .operation names the judged op — "Add" adds every provided
//   instance together with +, "String" renders the single instance.
class WrapperCase {
    arrays: number[][];
    operation: string;
    constructor(values: any[], _queryBudget?: unknown) {
        const [arrays, operation] = values;
        this.arrays = arrays;
        this.operation = operation;
    }
}
