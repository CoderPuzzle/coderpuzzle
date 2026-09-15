/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minXor = function (nums, k) {
    // dp over prefixes: dp[j][i] = smallest achievable "maximum part XOR"
    // splitting the first i elements into j parts. The last part of an
    // optimal split is nums[t..i-1], whose XOR is pre[i] ^ pre[t], so
    // dp[j][i] = min over t of max(dp[j-1][t], pre[i] ^ pre[t]).
    // Rows roll: prev is dp[j-1], cur becomes dp[j].
    const n = nums.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) pre[i + 1] = pre[i] ^ nums[i];

    const BIG = 2 ** 62; // safe sentinel: every XOR is < 2^30, so the 32-bit
    // JS `^` is exact on these operands (both below 2^30)
    let prev = pre.slice(); // dp[1][i] = XOR of the whole prefix — the only split
    for (let j = 2; j <= k; ++j) {
        const cur = new Array(n + 1).fill(BIG);
        for (let i = j; i <= n; ++i) {
            const pi = pre[i];
            let best = BIG;
            for (let t = j - 1; t < i; ++t) {
                const candidate = Math.max(prev[t], pi ^ pre[t]);
                if (candidate < best) best = candidate;
            }
            cur[i] = best;
        }
        prev = cur;
    }
    return prev[n];
};
