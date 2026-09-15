// Problem-provided driver for 2776 convert-callback-based-function-to-
// promise-based-function. Assembled into every submission by the judge
// ahead of the submitted code; never editable in the editor. This file
// is the hidden implementation — solvers see only the public API
// documented in the statement.
//
// The case spec names a callback-style fn (sum or product over the args,
// rejecting with the spec's message when one is present — the reject
// path still computes and passes the first callback argument, exactly
// like the statement's examples) and the args to call the promisified
// version with. drive() hands promisify itself to the submission, so the
// whole contract is exercised: the returned wrapper receives only the
// plain args, and its promise's settlement becomes the verdict.

class PromisifyDriver {
    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (the fn spec and this case's args) plus the query
    // budget (unused — fn is synchronous by construction).
    constructor([fnSpec, args], budget) {
        void budget;
        this.op = fnSpec.op;
        this.rejectWith = Object.prototype.hasOwnProperty.call(fnSpec, "rejectWith") ? fnSpec.rejectWith : null;
        this.args = args;
        this.settled = null;
    }

    compute(nums) {
        return this.op === "product"
            ? nums.reduce((total, value) => total * value, 1)
            : nums.reduce((total, value) => total + value, 0);
    }

    // Build this case's callback-based fn: callback(result) on success,
    // callback(result, error) when the spec demands a rejection.
    buildFn() {
        const driver = this;
        return function (callback, ...nums) {
            const result = driver.compute(nums);
            if (driver.rejectWith !== null) {
                callback(result, driver.rejectWith);
            } else {
                callback(result);
            }
        };
    }

    // Hand promisify to the submission, wrap this case's fn, call the
    // wrapper with the plain args, and classify the settlement: resolve
    // becomes {"resolved": value}, reject becomes {"rejected": error}.
    async drive(promisify) {
        if (typeof promisify !== "function") {
            throw new Error("promisify must be a function");
        }
        const asyncFunc = promisify(this.buildFn());
        if (typeof asyncFunc !== "function") {
            throw new Error("promisify must return a function");
        }
        const returned = asyncFunc(...this.args);
        if (!returned || typeof returned.then !== "function") {
            throw new Error("the wrapped call must return a promise");
        }
        await null;
        try {
            const value = await returned;
            this.settled = { resolved: value };
        } catch (error) {
            this.settled = { rejected: error };
        }
    }

    verdict() {
        if (this.settled === null) {
            throw new Error("the returned promise never settled");
        }
        return this.settled;
    }
}
