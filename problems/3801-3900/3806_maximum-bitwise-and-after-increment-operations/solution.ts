function maximumAND(nums: number[], k: number, m: number): number {
    // Values are at most 1e9 and k at most 1e9, so every raised value and
    // the answer stay below 2^31: bitwise ops remain in signed 32-bit
    // range, and the m-cost sum (at most 5e4 costs of ~2^31) reaches only
    // ~1.1e14, far inside the 2^53 exact range.
    // A mask is feasible when m elements can each be raised, total
    // increments within k, to a value carrying every mask bit; deciding
    // bits from high to low and keeping every feasible bit yields the
    // maximum AND.
    let res = 0;
    for (let b = 30; b >= 0; --b) {
        const cand = res | (1 << b);
        const costs: number[] = new Array(nums.length).fill(0);
        for (let i = 0; i < nums.length; ++i) {
            const num = nums[i];
            const missing = cand & ~num;
            if (missing === 0) continue;
            // With h the highest missing bit, the cheapest target >= num
            // covering cand keeps num's bits above h, sets bit h, and
            // fills cand's bits below h.
            const h = 31 - Math.clz32(missing);
            const t = ((num >>> (h + 1)) << (h + 1)) | (1 << h) | (cand & ((1 << h) - 1));
            costs[i] = t - num;
        }
        // Raises on different indices are independent, so the m cheapest
        // per-element costs decide feasibility.
        costs.sort((a, b) => a - b);
        let sum = 0;
        for (let i = 0; i < m; ++i) sum += costs[i];
        if (sum <= k) res = cand;
    }
    return res;
}
