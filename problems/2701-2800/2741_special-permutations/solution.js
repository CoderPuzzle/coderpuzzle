/**
 * @param {number[]} nums
 * @return {number}
 */
var specialPerm = function (nums) {
    const MOD = 1000000007;
    const n = nums.length;
    const size = 1 << n;
    // dp[mask][last]: ways to arrange exactly the indices in `mask`, ending
    // with `last`, every adjacent pair already compatible. n <= 14 keeps the
    // 2^n * n table small. Increasing mask order finalizes each state before
    // it propagates.
    const dp = Array.from({ length: size }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        dp[1 << i][i] = 1;
    }
    for (let mask = 0; mask < size; mask++) {
        for (let last = 0; last < n; last++) {
            if (!((mask >> last) & 1)) {
                continue;
            }
            const ways = dp[mask][last];
            if (ways === 0) {
                continue;
            }
            for (let nxt = 0; nxt < n; nxt++) {
                if ((mask >> nxt) & 1) {
                    continue;
                }
                // Push forward: append any unused index whose value divides
                // nums[last] or is divided by it (checked symmetrically).
                // Every special permutation decomposes uniquely into such
                // steps, so none is double-counted.
                if (nums[last] % nums[nxt] === 0 || nums[nxt] % nums[last] === 0) {
                    const t = dp[mask | (1 << nxt)];
                    t[nxt] = (t[nxt] + ways) % MOD;
                }
            }
        }
    }
    let total = 0;
    for (let i = 0; i < n; i++) {
        total = (total + dp[size - 1][i]) % MOD;
    }
    return total;
};
