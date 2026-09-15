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

type FnSpec = { op: "sum" | "product"; rejectWith?: string };

class PromisifyDriver {
    private op: "sum" | "product";
    private rejectWith: string | null;
    private args: number[];
    private settled: { resolved: unknown } | { rejected: unknown } | null = null;

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (the fn spec and this case's args) plus the query
    // budget (unused — fn is synchronous by construction). Both stay
    // untyped at the boundary: the generic wrapper reads them as opaque
    // values.
    constructor([fnSpec, args]: any[], budget?: any) {
        void budget;
        const spec = fnSpec as FnSpec;
        this.op = spec.op;
        this.rejectWith = spec.rejectWith !== undefined ? spec.rejectWith : null;
        this.args = args as number[];
    }

    private compute(nums: number[]): number {
        return this.op === "product"
            ? nums.reduce((total, value) => total * value, 1)
            : nums.reduce((total, value) => total + value, 0);
    }

    // Build this case's callback-based fn: callback(result) on success,
    // callback(result, error) when the spec demands a rejection.
    private buildFn(): (callback: (result: number, error?: unknown) => void, ...nums: number[]) => void {
        const driver = this;
        return function (callback: (result: number, error?: unknown) => void, ...nums: number[]): void {
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
    async drive(
        promisify: (fn: (...inputs: unknown[]) => unknown) => (...args: unknown[]) => Promise<unknown>,
    ): Promise<void> {
        if (typeof promisify !== "function") {
            throw new Error("promisify must be a function");
        }
        const asyncFunc = promisify(this.buildFn() as (...inputs: unknown[]) => unknown);
        if (typeof asyncFunc !== "function") {
            throw new Error("promisify must return a function");
        }
        const returned = asyncFunc(...this.args);
        if (!returned || typeof (returned as Promise<unknown>).then !== "function") {
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

    verdict(): { resolved: unknown } | { rejected: unknown } {
        if (this.settled === null) {
            throw new Error("the returned promise never settled");
        }
        return this.settled;
    }
}
