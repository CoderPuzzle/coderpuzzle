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

class TwoArrayCase {
    // The interactive wrapper hands the oracle the manifest's construct
    // values (tag-encoded keys spec, tag-encoded values spec, expected
    // object) plus the query budget (unused — one judged call per case).
    constructor([keys, values, answer], budget) {
        void budget;
        this.keys = keys;
        this.values = values;
        this.answer = answer;
        this.passed = false;
    }

    // Materialize one encoded element into a live value: tagged scalars
    // unwrap to their payload; "a"/"o" elements recurse over their
    // payloads' encoded children (objects are rebuilt faithfully — values
    // ride through untouched, exactly as the statement promises). Corpus
    // nesting is shallow by construction (an array key is at most a small
    // flat list), so plain recursion is safe here — unlike the
    // solution-side sweeps, nothing user-controlled grows deep.
    materialize(entry) {
        const tag = entry[0];
        if (tag === "a") {
            return entry[1].map((child) => this.materialize(child));
        }
        if (tag === "o") {
            const obj = {};
            for (const key of Object.keys(entry[1])) {
                obj[key] = this.materialize(entry[1][key]);
            }
            return obj;
        }
        return entry[1];
    }

    // Materialize both specs: each spec is an array of encoded elements.
    buildInputs() {
        const all = (spec) => spec.map((entry) => this.materialize(entry));
        return [all(this.keys), all(this.values)];
    }

    kindOf(value) {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        if (typeof value === "object") return "object";
        return typeof value;
    }

    // Structural equality over own string-keyed properties: a missing key
    // and an explicitly stored value compare as distinct, inherited names
    // ("toString", …) never stand in for own data, and key order is
    // irrelevant.
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

    // Drive the single judged invocation: build the live mixed-type arrays,
    // invoke the solution's createObject, remember the structural verdict.
    check(solution) {
        const [keysArr, valuesArr] = this.buildInputs();
        const actual = solution.createObject(keysArr, valuesArr);
        this.passed = this.sameValue(actual, this.answer);
    }

    // Void-return judging reads this: the wrapper emits it as the case's
    // actual value, which the judge exact-compares against true.
    verdict() {
        return this.passed;
    }
}
