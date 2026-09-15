// Problem-provided case runner for 2822 inversion-of-object. Assembled
// into every submission by the judge ahead of the submitted code; never
// editable in the editor. Solvers see only the public API documented in the
// statement: check(solution) and verdict().
//
// Why a runner at all: both the judged value and the expected answer are
// arbitrary JSON trees — the input is an object or an array whose values are
// strings, and the output is the inverted object, where a duplicated value's
// entry is an array of its originating keys while unique values map to one.
// The case travels as plain JSON (spec = the input structure, answer =
// expected inversion); this class hands the submitted solution a fresh copy
// of the spec and structurally compares the returned value against the
// answer right here, where key order inside the inverted object is
// irrelevant but the duplicate-key arrays must match element for element,
// and no value may be smuggled in as a singleton that should be collapsed.

interface Solver {
    inversionOfObject(obj: unknown): unknown;
}

class InversionCase {
    private readonly spec: unknown;
    private readonly answer: unknown;
    private passed = false;

    // The interactive wrapper hands the oracle the manifest's construct
    // values (input spec, expected output structure) plus the query budget
    // (unused — one judged call per case). The budget stays untyped: the
    // generic wrapper reads it as an opaque value.
    constructor([spec, answer]: unknown[], budget?: any) {
        void budget;
        this.spec = spec;
        this.answer = answer;
    }

    private isContainer(value: unknown): boolean {
        return value !== null && typeof value === "object";
    }

    // Materialize a fresh copy of the spec so the submission may transform
    // in place without ever aliasing case data. Iterative because legal
    // inputs can nest far deeper than call-stack recursion survives.
    buildInput(): unknown {
        const root: unknown = Array.isArray(this.spec) ? [] : {};
        const stack: [any, any][] = [[root, this.spec]];
        while (stack.length > 0) {
            const [target, source] = stack.pop() as [any, any];
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

    private kindOf(value: unknown): string {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        if (typeof value === "object") return "object";
        return typeof value;
    }

    // Structural equality that never consults JSON.stringify: containers
    // match when their key or index sets match recursively regardless of
    // key order, primitives compare with strict equality, and a missing
    // slot is different from any present slot — so a value inverted to a
    // single key string cannot stand in for the duplicate array, nor vice
    // versa, and array order counts because it encodes encounter order.
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

    // Drive the single judged invocation: copy the input live, invoke the
    // solution's inversionOfObject, remember the structural verdict.
    check(solution: Solver): void {
        const actual = solution.inversionOfObject(this.buildInput());
        this.passed = this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict(): boolean {
        return this.passed;
    }
}
