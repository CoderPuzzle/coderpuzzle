class Solution {
    runMemoized(memoizeCase: MemoizeCase): string {
        // Memoize through a tree whose spine walks the argument list one
        // parameter at a time. Each level is a Map holding that position's
        // already-seen branches: primitive arguments sit under their own
        // value (a Map compares them the way === does, keeping 1, "1" and
        // true apart and treating +0 and -0 alike), while every object or
        // array occurrence sits under a private symbol minted the first
        // time that exact reference appears — structural twins stay
        // distinct, as Example 2 demands. Symbols never collide with
        // primitive keys, so a cached 5 can never be confused with an
        // object numbered 5.
        const branchSymbols = new WeakMap<object | ((...args: any[]) => any), symbol>();
        const referenceKey = (value: object): symbol => {
            let key = branchSymbols.get(value);
            if (key === undefined) {
                key = Symbol("argument");
                branchSymbols.set(value, key);
            }
            return key;
        };

        const isByReference = (value: unknown): value is object =>
            value !== null && (typeof value === "object" || typeof value === "function");

        const leafMarker = Symbol("complete");

        const memoize = (fn: (...args: any[]) => any) => {
            const root = new Map<unknown, any>();
            return (...args: unknown[]): any => {
                let level = root;
                for (const arg of args) {
                    const key = isByReference(arg) ? referenceKey(arg) : arg;
                    let next = level.get(key);
                    if (next === undefined) {
                        next = new Map();
                        level.set(key, next);
                    }
                    level = next;
                }
                // A completed tuple parks its cached result under the leaf
                // marker; only a miss invokes fn, exactly once.
                if (!level.has(leafMarker)) {
                    level.set(leafMarker, fn(...args));
                }
                return level.get(leafMarker);
            };
        };

        // Drive the replay with call accounting: the wrapper is what fn's
        // cache actually invokes, so each pass through it marks one more
        // genuine fn() call and rows record the running total.
        let calls = 0;
        const countedFn = (...callArgs: any[]): any => {
            calls += 1;
            return memoizeCase.fn(...callArgs);
        };
        const memoized = memoize(countedFn);

        const rows: { val: unknown; calls: number }[] = [];
        for (const argumentList of memoizeCase.buildInputs()) {
            const val = memoized(...argumentList);
            rows.push({ val, calls });
        }
        return rows as unknown as string;
    }
}
