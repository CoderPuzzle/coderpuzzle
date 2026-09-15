// Problem-provided driver for 2675 array-of-objects-to-matrix. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation — solvers
// see only the public API documented in the statement.
//
// The driver owns one case's array of objects or arrays (the same shape as
// the statement's Input). drive() receives the submission's conversion
// function and calls it exactly once with (.arr); the returned matrix is
// validated to be an array and recorded as this case's judged output.

type JsonValue = any;

class MatrixCase {
    arr: JsonValue[];
    output: any;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (arr) plus the query budget (unused — one judged
    // call per case needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [input] = values;
        void _queryBudget;
        this.arr = input;
        this.output = null;
    }

    // Run the submission's converter against this case's input.
    drive(toMatrixFn: unknown): void {
        if (typeof toMatrixFn !== "function") {
            throw new Error("drive expects the submission's function");
        }
        const result = (toMatrixFn as (arr: JsonValue[]) => any)(this.arr);
        if (!Array.isArray(result)) {
            throw new Error("toMatrix must return an array");
        }
        this.output = result;
    }

    verdict(): any {
        return this.output;
    }
}
