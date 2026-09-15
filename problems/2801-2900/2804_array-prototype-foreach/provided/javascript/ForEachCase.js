// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   ForEachCase exposes the problem's one judged invocation: .arr is the
//   JSON array under test, .fn is the callable built from the case's
//   callback source, and .context is the this-value every callback call
//   must receive. collect() probes fresh arrays of its own and throws
//   unless the submission's Array.prototype.forEach honors the full
//   contract; run() then drives THIS case's array through the enhancement
//   and records its final contents — the judged transcript. Both calls
//   refuse the native Array.prototype.forEach, captured below before any
//   submission code has run.
const coderpuzzleNativeForEach = Array.prototype.forEach;

class ForEachCase {
    constructor(values) {
        const [arr, source, context] = values;
        if (!Array.isArray(arr)) {
            throw new Error("arr must be a JSON array");
        }
        if (typeof source !== "string") {
            throw new Error("callback source must be a string");
        }
        this.arr = arr;
        this.context = context;
        // An arrow's `this` binds lexically, so the statement's context
        // rule could not hold through one unchanged: a leading
        // parenthesized parameter list with an => head is rewritten once
        // to a function declaration here; any other source shape is kept
        // byte-exact.
        const bound = source.replace(
            /^(\s*)(async\s+)?\(([^()]*)\)\s*=>\s*([\s\S]+)$/,
            (_all, pad, asyncWord, params, body) =>
                `${pad}${asyncWord || ""}function (${params}) ` +
                (body.trimStart().startsWith("{") ? body.trim() : `{ return ${body.trim()}; }`),
        );
        this.fn = new Function("return (" + bound + ");")();
    }

    // The one sanctioned probe call from solve(); every check throws on a
    // contract breach.
    collect() {
        const walk = [5, 6];
        const calls = [];
        walk.forEach(function (value, index, owner) {
            calls.push([value, index, owner === walk]);
        });
        if (JSON.stringify(calls) !== "[[5,0,true],[6,1,true]]") {
            throw new Error("forEach must visit 0..length-1 passing (element, index, array)");
        }
        const writes = [1, 2];
        writes.forEach(function (value, index, host) {
            host[index] = value + 1;
        });
        if (JSON.stringify(writes) !== "[2,3]") {
            throw new Error("slot writes made by earlier visits must be visible later");
        }
        let visits = 0;
        [].forEach(function () {
            ++visits;
        });
        if (visits !== 0) {
            throw new Error("empty arrays must not invoke the callback");
        }
        const mark = { mark: true };
        let seenThis = null;
        ["z"].forEach(function () {
            seenThis = this;
        }, mark);
        if (seenThis !== mark) {
            throw new Error("context must arrive as the callback's this");
        }
        if ([1].forEach(function () {}) !== undefined) {
            throw new Error("forEach should not return anything");
        }
    }

    // The one sanctioned run call from solve(): pushes the case array
    // itself through the submitted enhancement and snapshots where it
    // ends up. The snapshot, not the live array, is what verdict()
    // reports.
    run() {
        if (this.arr.forEach === coderpuzzleNativeForEach) {
            throw new Error("define your own Array.prototype.forEach; the native method does not count");
        }
        this.arr.forEach(this.fn, this.context);
        this.output = JSON.parse(JSON.stringify(this.arr));
    }

    verdict() {
        return this.output;
    }
}
