// Problem-provided driver for 2649 nested-array-generator. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. This file is the hidden implementation — solvers
// see only the public API documented in the statement.
//
// The driver owns one case's multi-dimensional array (the same shape as
// the statement's Input). drive() receives the submission's generator
// function and calls it exactly once with .arr; it then pumps the returned
// generator object with .next() until it reports done, recording every
// yielded integer in arrival order as this case's judged output.

type JsonNode = number | any[];

class GeneratorCase {
    arr: JsonNode[];
    output: number[] | null;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (arr) plus the query budget (unused — one judged
    // pump per case needs no call accounting).
    constructor(values: any[], _queryBudget?: unknown) {
        const [nested] = values;
        void _queryBudget;
        this.arr = nested;
        this.output = null;
    }

    // Run the submission's traversal against this case's input. A sync
    // generator settles entirely within the call, so plain iteration is
    // enough — no timers or microtask scheduling involved.
    drive(inorderTraversalFn: unknown): void {
        if (typeof inorderTraversalFn !== "function") {
            throw new Error("drive expects the submission's inorderTraversal function");
        }
        const generator = (inorderTraversalFn as (arr: JsonNode[]) => Generator<number>)(this.arr);
        if (!generator || typeof generator.next !== "function") {
            throw new Error("inorderTraversal must return a generator object");
        }
        const yielded: number[] = [];
        for (;;) {
            const step = generator.next();
            if (step.done) break;
            yielded.push(step.value);
        }
        this.output = yielded;
    }

    verdict(): number[] | null {
        return this.output;
    }
}
