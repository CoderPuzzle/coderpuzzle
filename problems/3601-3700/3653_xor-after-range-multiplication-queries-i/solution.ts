function xorAfterQueries(nums: number[], queries: number[][]): number {
    const MOD = 1e9 + 7;
    // Fold every query into a scratch copy: walk the indices l, l + k,
    // ... up to r, multiplying each visited element modulo the prime.
    // At most n positions per query keep the total work at n * q.
    const values = nums.slice();
    for (const [l, r, k, v] of queries) {
        for (let idx = l; idx <= r; idx += k) {
            // Products reach only ~10^14, far below 2^53, so plain
            // numbers stay exact through the multiply and the fold.
            values[idx] = (values[idx] * v) % MOD;
        }
    }
    // Every element ends below 2^30, so the XOR stays exact too.
    let result = 0;
    for (const value of values) {
        result ^= value;
    }
    return result;
}
