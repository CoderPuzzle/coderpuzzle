// Problem-provided case runner for 2775 undefined-to-null. Assembled into
// every submission by the judge ahead of the submitted code; never editable
// in the editor. Solvers see only the public API documented in the
// statement: check(solution) and verdict().
//
// Why a runner at all: the input carries real JavaScript `undefined`
// values, which cannot ride the JSON case wire (JSON.stringify drops them).
// Each case therefore travels as a marker-encoded structure; this class
// materializes the live object — genuine `undefined` slots on plain
// containers, dense arrays — hands it to the submitted solution, and
// structurally compares the returned value against the expected structure
// right here, where an absent slot, an `undefined` slot and an explicit
// null stay three different observations.

const UNDEFINED_MARKER = "__UNDEFINED__";

class UndefinedCase {
    // The interactive wrapper hands the oracle the manifest's construct
    // values (marker-encoded input spec, expected output structure) plus
    // the query budget (unused — one judged call per case).
    constructor([spec, answer], budget) {
        void budget;
        this.spec = spec;
        this.answer = answer;
        this.passed = false;
    }

    isContainer(value) {
        return value !== null && typeof value === "object";
    }

    // Materialize the spec as a fresh live value: markers become genuine
    // `undefined` own-property slots; everything else is copied. Arrays are
    // written index by index, so they stay dense by construction — the
    // domain is JSON.parse-shaped data with values poked to `undefined`,
    // never deleted indexes. Iterative because legal inputs can nest far
    // deeper than call-stack recursion survives.
    buildInput() {
        const root = Array.isArray(this.spec) ? [] : {};
        const stack = [[root, this.spec]];
        while (stack.length > 0) {
            const [target, source] = stack.pop();
            if (Array.isArray(source)) {
                for (let index = 0; index < source.length; index++) {
                    const value = source[index];
                    if (value === UNDEFINED_MARKER) {
                        target[index] = undefined;
                    } else if (this.isContainer(value)) {
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
                    if (value === UNDEFINED_MARKER) {
                        target[key] = undefined;
                    } else if (this.isContainer(value)) {
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

    // Structural equality that never consults JSON.stringify: a missing
    // key, an `undefined` slot and an explicit null compare as distinct,
    // and key order is irrelevant.
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

    // Drive the single judged invocation: build the live input with fresh
    // `undefined` holes, invoke the solution's undefinedToNull, remember
    // the structural verdict.
    check(solution) {
        const actual = solution.undefinedToNull(this.buildInput());
        this.passed = this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict() {
        return this.passed;
    }
}
