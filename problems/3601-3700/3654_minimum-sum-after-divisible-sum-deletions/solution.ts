function minArraySum(nums: number[], k: number): number {
    // A block sums to a multiple of k exactly when its endpoint prefix
    // sums share a remainder mod k, and any deletion sequence collapses
    // to disjoint divisible-sum blocks of the original array.
    const best = new Map<number, number>([[0, 0]]);
    // dp: min surviving sum over the elements processed so far. Totals top
    // out near 1e11, far below 2^53, so numbers stay exact.
    let dp = 0;
    let prefix = 0;
    for (const value of nums) {
        // Keep this element...
        let cand = dp + value;
        prefix += value;
        // ...or delete back to the nearest same-remainder prefix, which
        // leaves that prefix's surviving sum untouched.
        const r = prefix % k;
        const seen = best.get(r);
        if (seen !== undefined && seen < cand) {
            cand = seen;
        }
        dp = cand;
        // Insert after the lookup so the empty block never registers.
        const cur = best.get(r);
        if (cur === undefined || dp < cur) {
            best.set(r, dp);
        }
    }
    return dp;
}
