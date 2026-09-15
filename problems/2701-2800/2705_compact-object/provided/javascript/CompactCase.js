// Problem-provided case runner for 2705 compact-object. Assembled into
// every submission by the judge ahead of the submitted code; never editable
// in the editor. Solvers see only the public API documented in the
// statement: check(solution) and verdict().
//
// Why a runner at all: the judged value is an arbitrary JSON tree — an
// object or an array at the root — whose falsy slots must vanish while
// containers survive even when emptied. The case travels as plain JSON
// (spec = the input structure, answer = expected compact structure); this
// class hands the submitted solution a fresh copy of the spec and
// structurally compares the returned value against the answer right here,
// where an emptied-but-present container stays distinct from an absent
// slot, falsy survivors cannot be smuggled back in, and key order is
// irrelevant.

class CompactCase {
    // The interactive wrapper hands the oracle the manifest's construct
    // values (input spec, expected output structure) plus the query budget
    // (unused — one judged call per case).
    constructor([spec, answer], budget) {
        void budget;
        this.spec = spec;
        this.answer = answer;
        this.passed = false;
    }

    isContainer(value) {
        return value !== null && typeof value === "object";
    }

    // Materialize a fresh copy of the spec so the submission may transform
    // in place without ever aliasing case data. Iterative because legal
    // inputs can nest far deeper than call-stack recursion survives.
    buildInput() {
        const root = Array.isArray(this.spec) ? [] : {};
        const stack = [[root, this.spec]];
        while (stack.length > 0) {
            const [target, source] = stack.pop();
            if (Array.isArray(source)) {
                for (let index = 0; index < source.length; index++) {
                    const value = source[index];
                    if (this.isContainer(value)) {
                        const child = Array.isArray(value) ? [] : {};
                        target[index] = child;
                        stack.push([child, value]);
                    } else {
                        target[index] = value;
                    }
                }
            } else {
                for (const key of Object.keys(source)) {
                    const value = source[key];
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
    // falsy primitive that should have been removed.
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

    // Drive the single judged invocation: copy the input live, invoke the
    // solution's compactObject, remember the structural verdict.
    check(solution) {
        const actual = solution.compactObject(this.buildInput());
        this.passed = this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict() {
        return this.passed;
    }
}
