// bundle-provided case runner for 2724 sort-by. Assembled into every
// submission by the judge ahead of the submitted code; never editable
// in the editor. Solvers see only the public API documented in the
// statement: check(solution) and verdict().
//
// Why a runner at all: the judged value is an arbitrary JSON array whose
// elements may be numbers, strings, booleans, nulls, objects or further
// arrays. The case travels as plain JSON (arr = the array under test,
// source = the function source text, answer = the expected ascending
// order); this class rebuilds the callable from its source text via
// new Function, hands the submitted solution a fresh outer copy of arr
// plus that callable, and compares the returned array against the answer
// element-for-element — array order IS the judgment, object elements
// match on key sets regardless of key order.

interface SortSolver {
    sortBy(arr: unknown[], fn: (value: any) => number): unknown[];
}

class SortCase {
    private readonly arr: unknown[];
    private readonly fn: (value: any) => number;
    private readonly answer: unknown[];
    private passed = false;

    // The interactive wrapper hands the oracle the manifest's construct
    // values (array under test, function source text, expected order)
    // plus the query budget (unused — one judged call per case). The
    // budget stays untyped: the generic wrapper reads it as an opaque
    // value.
    constructor([arr, source, answer]: unknown[], budget?: any) {
        void budget;
        this.arr = arr as unknown[];
        this.fn = new Function("return (" + String(source) + ");")() as (value: any) => number;
        this.answer = answer as unknown[];
    }

    private kindOf(value: unknown): string {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        if (typeof value === "object") return "object";
        return typeof value;
    }

    // Structural equality that never consults JSON.stringify: arrays
    // match position-for-position (order is what sorting decides),
    // objects match when their key sets match recursively regardless of
    // key order, primitives compare with strict equality.
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

    // A fresh outer array so a solution may sort in place without ever
    // aliasing the stored case data.
    buildInput(): unknown[] {
        return this.arr.slice();
    }

    // Drive the single judged invocation: pass a live copy of the array
    // plus the rebuilt callable, remember the structural verdict.
    check(solution: SortSolver): void {
        const actual = solution.sortBy(this.buildInput(), this.fn);
        this.passed =
            Array.isArray(actual) && actual.length === this.answer.length && this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict(): boolean {
        return this.passed;
    }
}
