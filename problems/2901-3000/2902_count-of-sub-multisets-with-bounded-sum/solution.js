/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var countSubMultisets = function (nums, l, r) {
    // Group equal values: a sub-multiset takes each distinct value v
    // somewhere in 0..cnt[v] copies, so one pass per distinct value
    // applies the bounded-knapsack factor new[x] = sum(dp[x - k*v] for
    // k in 0..cnt[v]): a forward unbounded pass folds dp[x - v] into
    // dp[x], then subtracting dp[x - (cnt+1)*v] removes every choice
    // that used too many copies. Zeros change no sum and multiply every
    // count by cnt[0] + 1; the answer is the range sum
    // dp[l] + ... + dp[r]. Every intermediate stays below
    // 2 * (10^9 + 6) < 2^53, so Number arithmetic is exact.
    const MOD = 1000000007;
    const counts = new Map();
    for (const v of nums) {
        counts.set(v, (counts.get(v) || 0) + 1);
    }
    const dp = new Array(r + 1).fill(0);
    dp[0] = 1;
    for (const [v, c] of counts) {
        if (v === 0) {
            for (let x = 0; x <= r; x++) {
                dp[x] = (dp[x] * (c + 1)) % MOD;
            }
        } else if (v <= r) {
            for (let x = v; x <= r; x++) {
                dp[x] = (dp[x] + dp[x - v]) % MOD;
            }
            const width = (c + 1) * v;
            for (let x = r; x >= width; x--) {
                dp[x] = (dp[x] - dp[x - width] + MOD) % MOD;
            }
        }
    }
    let ans = 0;
    for (let x = l; x <= r; x++) {
        ans = (ans + dp[x]) % MOD;
    }
    return ans;
};
