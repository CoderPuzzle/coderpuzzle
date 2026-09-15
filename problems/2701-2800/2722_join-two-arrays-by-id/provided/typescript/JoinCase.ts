// Problem-provided case runner for 2722 join-two-arrays-by-id. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. Solvers see only the public API documented in
// the statement: check(solution) and verdict().
//
// Why a runner at all: both inputs and the judged output are arbitrary
// JSON trees (arrays of records whose values may be any JSON value). The
// case travels as plain JSON (arr1, arr2, answer = expected joined array);
// this class hands the submitted solution fresh copies of both input
// arrays and structurally compares the returned array against the answer
// right here, element by element: outer order is significant because ids
// must ascend, while key order inside merged objects is irrelevant, and
// falsy-looking survivors (null, false, 0, "") stay distinct from absent
// slots.

interface Solver {
    joinTwoArrays(arr1: Record<string, unknown>[], arr2: Record<string, unknown>[]): Record<string, unknown>[];
}

class JoinCase {
    private readonly arr1: unknown[];
    private readonly arr2: unknown[];
    private readonly answer: unknown;
    private passed = false;

    // The interactive wrapper hands the oracle the manifest's construct
    // values (both input arrays, expected joined array) plus the query
    // budget (unused — one judged call per case). The budget stays
    // untyped: the generic wrapper reads it as an opaque value.
    constructor([arr1, arr2, answer]: unknown[], budget?: any) {
        void budget;
        this.arr1 = arr1 as unknown[];
        this.arr2 = arr2 as unknown[];
        this.answer = answer;
    }

    private isContainer(value: unknown): boolean {
        return value !== null && typeof value === "object";
    }

    // Materialize a fresh copy of one input array so the submission may
    // transform its slots freely without ever aliasing case data.
    // Iterative because legal inputs can nest far deeper than call-stack
    // recursion survives.
    copyTree(source: unknown): unknown {
        const root: unknown = Array.isArray(source) ? [] : {};
        const stack: [any, any][] = [[root, source]];
        while (stack.length > 0) {
            const [target, from] = stack.pop() as [any, any];
            if (Array.isArray(from)) {
                for (let index = 0; index < from.length; index++) {
                    const value = from[index];
                    if (this.isContainer(value)) {
                        const child = Array.isArray(value) ? [] : {};
                        target[index] = child;
                        stack.push([child, value]);
                    } else {
                        target[index] = value;
                    }
                }
            } else {
                const record = from as Record<string, unknown>;
                for (const key of Object.keys(record)) {
                    const value = record[key];
                    if (this.isContainer(value)) {
                        const child = Array.isArray(value) ? [] : {};
                        target[key] = child;
                        stack.push([child, value]);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
        return root;
    }

    private kindOf(value: unknown): string {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        if (typeof value === "object") return "object";
        return typeof value;
    }

    // Structural equality that never consults JSON.stringify: containers
    // match when their key or index sets match recursively regardless of
    // key order, primitives compare with strict equality, and a missing
    // slot is different from any present slot — including one holding a
    // falsy survivor like null or "".
    private sameValue(left: unknown, right: unknown): boolean {
        const stack: [unknown, unknown][] = [[left, right]];
        while (stack.length > 0) {
            const [a, b] = stack.pop() as [unknown, unknown];
            const kind = this.kindOf(b);
            if (this.kindOf(a) !== kind) return false;
            if (kind === "array") {
                const mine = a as unknown[];
                const theirs = b as unknown[];
                if (mine.length !== theirs.length) return false;
                for (let index = 0; index < theirs.length; index++) {
                    stack.push([mine[index], theirs[index]]);
                }
            } else if (kind === "object") {
                const mine = a as Record<string, unknown>;
                const theirs = b as Record<string, unknown>;
                if (Object.keys(mine).length !== Object.keys(theirs).length) {
                    return false;
                }
                for (const key of Object.keys(theirs)) {
                    if (!Object.prototype.hasOwnProperty.call(mine, key)) {
                        return false;
                    }
                    stack.push([mine[key], theirs[key]]);
                }
            } else if (a !== b) {
                return false;
            }
        }
        return true;
    }

    // Drive the single judged invocation: copy both inputs live, invoke
    // the solution's joinTwoArrays, remember the structural verdict.
    check(solution: Solver): void {
        const left = this.copyTree(this.arr1) as Record<string, unknown>[];
        const right = this.copyTree(this.arr2) as Record<string, unknown>[];
        const actual = solution.joinTwoArrays(left, right);
        this.passed = this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict(): boolean {
        return this.passed;
    }
}
