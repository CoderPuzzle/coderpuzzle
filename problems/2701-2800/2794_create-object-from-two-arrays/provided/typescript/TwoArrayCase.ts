// Problem-provided case runner for 2794 create-object-from-two-arrays.
// Assembled into every submission by the judge ahead of the submitted code;
// never editable in the editor. Solvers see only the public API documented
// in the statement: check(solution) and verdict().
//
// Why a runner at all: keysArr's elements are genuinely mixed-typed — the
// string "1" and the number 1 must arrive as different values so their
// String() collision is observable — and a bare JSON array cannot express
// that distinction. Each element therefore travels as a [tag, payload]
// pair, which is unambiguous because *every* element is encoded (no magic
// string can collide with real data):
//
//     ["s", str]   string          ["a", [...]]  array (elements recursive)
//     ["n", num]   number          ["o", {...}]  plain object (String()
//     ["b", bool]  boolean                        renders "[object Object]")
//     ["z", null]  null
//
// This class materializes the two live arrays, hands them to the submitted
// createObject, and structurally compares the returned object against the
// expected key-value structure right here: own string-keyed properties only,
// key set must match exactly, values compared deeply, insertion order never
// consulted (the statement fixes no ordering). Prototype-chain entries are
// invisible to the comparison by construction.

type WireElement = [string, unknown];

interface Solver {
    createObject(keysArr: unknown[], valuesArr: unknown[]): unknown;
}

class TwoArrayCase {
    private readonly keys: WireElement[];
    private readonly values: WireElement[];
    private readonly answer: unknown;
    private passed = false;

    // The interactive wrapper hands the oracle the manifest's construct
    // values (tag-encoded keys spec, tag-encoded values spec, expected
    // object) plus the query budget (unused — one judged call per case).
    // Both stay untyped at the boundary: the generic wrapper reads them as
    // opaque values, and the casts below restore the wire shapes.
    constructor([keys, values, answer]: unknown[], budget?: any) {
        void budget;
        this.keys = keys as WireElement[];
        this.values = values as WireElement[];
        this.answer = answer;
    }

    // Materialize one encoded element into a live value: tagged scalars
    // unwrap to their payload; an "a" element recurses over its payload's
    // encoded children. Corpus nesting is shallow by construction (an array
    // key is at most a small flat list), so plain recursion is safe here —
    // unlike the solution-side sweeps, nothing user-controlled grows deep.
    private materialize(entry: WireElement): unknown {
        const [tag, payload] = entry;
        if (tag === "a") {
            return (payload as WireElement[]).map((child) => this.materialize(child));
        }
        if (tag === "o") {
            const obj: Record<string, unknown> = {};
            for (const key of Object.keys(payload as Record<string, unknown>)) {
                obj[key] = this.materialize((payload as Record<string, unknown>)[key] as WireElement);
            }
            return obj;
        }
        return payload;
    }

    buildInputs(): unknown[][] {
        return [this.materializeAll(this.keys), this.materializeAll(this.values)];
    }

    private materializeAll(spec: WireElement[]): unknown[] {
        return spec.map((entry) => this.materialize(entry));
    }

    private kindOf(value: unknown): string {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        if (typeof value === "object") return "object";
        return typeof value;
    }

    // Structural equality over own string-keyed properties: a missing key
    // and an explicitly stored value compare as distinct, inherited names
    // ("toString", …) never stand in for own data, and key order is
    // irrelevant.
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

    // Drive the single judged invocation: build the live mixed-type arrays,
    // invoke the solution's createObject, remember the structural verdict.
    check(solution: Solver): void {
        const [keysArr, valuesArr] = this.buildInputs();
        const actual = solution.createObject(keysArr, valuesArr);
        this.passed = this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict(): boolean {
        return this.passed;
    }
}
