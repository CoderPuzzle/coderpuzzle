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

class JoinCase {
    // The interactive wrapper hands the oracle the manifest's construct
    // values (both input arrays, expected joined array) plus the query
    // budget (unused — one judged call per case).
    constructor([arr1, arr2, answer], budget) {
        void budget;
        this.arr1 = arr1;
        this.arr2 = arr2;
        this.answer = answer;
        this.passed = false;
    }

    isContainer(value) {
        return value !== null && typeof value === "object";
    }

    // Materialize a fresh copy of one input array so the submission may
    // transform its slots freely without ever aliasing case data.
    // Iterative because legal inputs can nest far deeper than call-stack
    // recursion survives.
    copyTree(source) {
        const root = Array.isArray(source) ? [] : {};
        const stack = [[root, source]];
        while (stack.length > 0) {
            const [target, from] = stack.pop();
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
                for (const key of Object.keys(from)) {
                    const value = from[key];
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

    kindOf(value) {
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
    sameValue(left, right) {
        const stack = [[left, right]];
        while (stack.length > 0) {
            const [a, b] = stack.pop();
            const kind = this.kindOf(b);
            if (this.kindOf(a) !== kind) return false;
            if (kind === "array") {
                if (a.length !== b.length) return false;
                for (let index = 0; index < b.length; index++) {
                    stack.push([a[index], b[index]]);
                }
            } else if (kind === "object") {
                const mine = Object.keys(a);
                if (mine.length !== Object.keys(b).length) return false;
                for (const key of Object.keys(b)) {
                    if (!Object.prototype.hasOwnProperty.call(a, key)) {
                        return false;
                    }
                    stack.push([a[key], b[key]]);
                }
            } else if (a !== b) {
                return false;
            }
        }
        return true;
    }

    // Drive the single judged invocation: copy both inputs live, invoke
    // the solution's joinTwoArrays, remember the structural verdict.
    check(solution) {
        const actual = solution.joinTwoArrays(this.copyTree(this.arr1), this.copyTree(this.arr2));
        this.passed = this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict() {
        return this.passed;
    }
}
