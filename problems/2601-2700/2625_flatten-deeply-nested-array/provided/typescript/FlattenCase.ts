// Problem-provided driver for 2625 flatten-deeply-nested-array. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation — solvers
// see only the public API documented in the statement.
//
// The driver owns one case's nested array and depth (the same shape as the
// statement's Input). drive() receives the submission's flat function and
// calls it exactly once with (.arr, .n); the returned array is validated to
// be an array and recorded as this case's judged output.

type JsonNode = number | any[];

class FlattenCase {
    arr: any[];
    n: number;
    output: any[] | null;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (arr, n) plus the query budget (unused — one judged
    // call per case needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [nested, depth] = values;
        void _queryBudget;
        this.arr = nested;
        this.n = depth;
        this.output = null;
    }

    // Run the submission's flattener against this case's input.
    drive(flatFn: unknown): void {
        if (typeof flatFn !== "function") {
            throw new Error("drive expects the submission's flat function");
        }
        const result = (flatFn as (arr: JsonNode[], depth: number) => any[])(this.arr, this.n);
        if (!Array.isArray(result)) {
            throw new Error("flat must return an array");
        }
        this.output = result;
    }

    verdict(): any {
        return this.output;
    }
}
