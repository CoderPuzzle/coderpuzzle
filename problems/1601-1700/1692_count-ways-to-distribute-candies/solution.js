/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var waysToDistribute = function (n, k) {
    // dp[i][j] counts distributions of the first i candies into exactly j
    // nonempty bags: candy i either joins one of the j bags the first
    // i - 1 candies already fill (j choices) or opens the j-th bag
    // itself, so dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1] — the
    // Stirling-number recurrence. Bags are unordered, so "open a new bag"
    // has no identity to choose and every distribution is built exactly
    // once. Each row depends only on the row above, so two rows of k + 1
    // residues carry the whole table. Residues stay below 2^30 and j at
    // or below 1000, so j * prev[j] + prev[j - 1] stays below 2^41 —
    // inside the range where a JavaScript number is an exact integer.
    const MOD = 1_000_000_007;
    let prev = new Array(k + 1).fill(0);
    prev[0] = 1;
    for (let i = 1; i <= n; i++) {
        const cur = new Array(k + 1).fill(0);
        const top = Math.min(i, k);
        for (let j = 1; j <= top; j++) {
            cur[j] = (j * prev[j] + prev[j - 1]) % MOD;
        }
        prev = cur;
    }
    return prev[k];
};
