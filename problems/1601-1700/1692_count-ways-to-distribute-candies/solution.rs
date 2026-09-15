impl Solution {
    pub fn ways_to_distribute(n: i32, k: i32) -> i32 {
        // dp[i][j] counts distributions of the first i candies into
        // exactly j nonempty bags: candy i either joins one of the j bags
        // the first i - 1 candies already fill (j choices) or opens the
        // j-th bag itself, so dp[i][j] = j * dp[i - 1][j] +
        // dp[i - 1][j - 1] — the Stirling-number recurrence. Bags are
        // unordered, so "open a new bag" has no identity to choose and
        // every distribution is built exactly once. Each row depends only
        // on the row above, so two rows of k + 1 residues carry the whole
        // table. Residues stay below 2^30 and j at or below 1000, so
        // j * prev[j] + prev[j - 1] stays below 2^41 — safely inside the
        // i64 registers used here.
        const MOD: i64 = 1_000_000_007;
        let (n, k) = (n as usize, k as usize);
        let mut prev = vec![0i64; k + 1];
        prev[0] = 1;
        for i in 1..=n {
            let mut cur = vec![0i64; k + 1];
            let top = i.min(k);
            for j in 1..=top {
                cur[j] = (j as i64 * prev[j] + prev[j - 1]) % MOD;
            }
            prev = cur;
        }
        prev[k] as i32
    }
}
