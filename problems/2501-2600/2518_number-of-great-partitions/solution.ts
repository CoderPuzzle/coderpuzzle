function countPartitions(nums: number[], k: number): number {
    // Reverse view per the hint: a partition fails when either group's
    // sum lands under k, and both failures coincide only if the total is
    // under 2*k -- then zero great partitions exist outright. Otherwise
    // every subset with sum < k names one failure per side, so the
    // answer is 2^n minus twice their count.
    const MOD = 1e9 + 7;
    let total = 0;
    for (const value of nums) total += value;
    if (total < 2 * k) return 0;
    // ways[s] holds, mod p, how many subsets of the processed prefix sum
    // to s; rows at k and beyond can never come back below k. Every
    // addition carries two residues below 1e9+7, so intermediates stay
    // under 2^31 -- far inside Number's exact 2^53 range.
    const ways = new Array(k).fill(0);
    ways[0] = 1;
    for (const value of nums) {
        for (let s = k - 1; s >= value; --s) {
            ways[s] = (ways[s] + ways[s - value]) % MOD;
        }
    }
    let below = 0;
    for (const count of ways) below = (below + count) % MOD;
    let power = 1;
    for (let i = 0; i < nums.length; ++i) power = (power * 2) % MOD;
    return (((power - 2 * below) % MOD) + MOD) % MOD;
}
