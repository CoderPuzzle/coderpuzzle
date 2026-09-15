/**
 * @param {number[][]} conversions
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryConversions = function (conversions, queries) {
    const MOD = 1000000007n;
    const n = conversions.length + 1;
    // The edges form a tree rooted at unit 0. fromRoot[u] is the number of
    // units of type u equivalent to one unit of type 0: the residue of the
    // product of factors along the path from the root. Residues stay below
    // 2^30, but their product reaches 2^60 — past the 2^53 exact-Number
    // bound — so each multiply folds through BigInt before reducing.
    const children = Array.from({ length: n }, () => []);
    for (const [source, target, factor] of conversions) {
        children[source].push([target, factor]);
    }
    const fromRoot = new Array(n).fill(1);
    const stack = [0];
    while (stack.length > 0) {
        const unit = stack.pop();
        for (const [child, factor] of children[unit]) {
            fromRoot[child] = Number((BigInt(fromRoot[unit]) * BigInt(factor)) % MOD);
            stack.push(child);
        }
    }
    // 1 unit of type a equals fromRoot[b] / fromRoot[a] units of type b.
    // Every factor is < MOD, so no residue is 0 and the inverse exists.
    // Extended Euclid keeps every coefficient below MOD — safe in a Number
    // — and the final residue product folds through BigInt like above.
    const inverse = (value) => {
        let oldR = value;
        let r = 1000000007;
        let oldS = 1;
        let s = 0;
        while (r !== 0) {
            const q = Math.floor(oldR / r);
            [oldR, r] = [r, oldR - q * r];
            [oldS, s] = [s, oldS - q * s];
        }
        return ((oldS % 1000000007) + 1000000007) % 1000000007;
    };
    return queries.map(([a, b]) => Number((BigInt(fromRoot[b]) * BigInt(inverse(fromRoot[a]))) % MOD));
};
