/**
 * @param {number[]} nums
 * @return {number}
 */
var getSum = function (nums) {
    // Per-value chain-sum DP over four Maps keyed by value. For each
    // direction, incCnt/decCnt count the chains seen so far that end at an
    // element of a value and incSum/decSum carry their total element-sum;
    // buckets accumulate across duplicate occurrences, so element x extends
    // every earlier chain ending at x-1 (or x+1) — subsequence semantics,
    // not substring. New chains ending here have count cnt + 1 (the
    // singleton [x]) and sum sum + cnt * x + x; the singleton lives in both
    // directions but is counted once, so the step contributes
    // incSum' + decSum' - x. Reduced mod 1e9 + 7 every update: stored values
    // stay below 1e9 + 7 and the widest intermediate is ni * x + si <
    // (1e9 + 7) * 1e5 ≈ 10^14 < 2^53 ≈ 9 * 10^15, so Number arithmetic is
    // exact.
    const MOD = 1e9 + 7;
    const incCnt = new Map();
    const incSum = new Map();
    const decCnt = new Map();
    const decSum = new Map();
    let total = 0;
    for (const x of nums) {
        const ci = incCnt.get(x - 1) || 0;
        const si = incSum.get(x - 1) || 0;
        const cd = decCnt.get(x + 1) || 0;
        const sd = decSum.get(x + 1) || 0;
        const ni = (ci + 1) % MOD;
        const nsi = (si + ni * x) % MOD;
        const nd = (cd + 1) % MOD;
        const nsd = (sd + nd * x) % MOD;
        total = (((total + nsi + nsd - x) % MOD) + MOD) % MOD;
        incCnt.set(x, ((incCnt.get(x) || 0) + ni) % MOD);
        incSum.set(x, ((incSum.get(x) || 0) + nsi) % MOD);
        decCnt.set(x, ((decCnt.get(x) || 0) + nd) % MOD);
        decSum.set(x, ((decSum.get(x) || 0) + nsd) % MOD);
    }
    return total;
};
