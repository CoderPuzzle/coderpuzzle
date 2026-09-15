class Solution {
    applyCurried(curryCase: CurryCase): string {
        // Curry by accumulating argument batches without nesting closures:
        // each partial application concatenates the new batch onto a fresh
        // list and either calls fn (once the count reaches its explicit
        // parameter total, read from fn.length) or hands back another
        // single-level stage. Because a chained application like
        // curried(1)(2)(3) evaluates one application at a time, this stays
        // a couple of stack frames deep no matter how long the chain is —
        // safe for arities in the hundreds. Concatenating instead of
        // mutating keeps stages reusable: replaying an intermediate stage
        // can never leak batches into an unrelated chain.
        const curry = (fn: (...args: any[]) => any): any => {
            const arity = fn.length;
            const collect =
                (sofar: any[]) =>
                (...batch: any[]): any => {
                    const merged = sofar.concat(batch);
                    return merged.length >= arity ? fn(...merged) : collect(merged);
                };
            return collect([]);
        };

        let stage: any = curry(curryCase.fn);
        for (const batch of curryCase.inputs) {
            stage = stage(...batch);
        }
        return stage;
    }
}
