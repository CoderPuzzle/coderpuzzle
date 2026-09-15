impl Solution {
    // The curse forces each start's journey: magician i jumps to
    // i + k, then i + 2k, and so on until the line ends. So dp[i],
    // the total gained when starting at i, obeys
    // dp[i] = energy[i] + dp[i + k]: one backward pass fills every
    // chain as a running suffix sum, and the answer is the largest
    // entry. Every journey holds at most n cells of magnitude up to
    // 1000, so |dp[i]| <= 10⁵ * 10³ = 10⁸, which already fits in an
    // i32 — the i64 accumulator simply matches the declared return.
    pub fn maximum_energy(energy: Vec<i32>, k: i32) -> i64 {
        let n = energy.len();
        let mut dp = vec![0i64; n];
        let k = k as usize;
        dp[n - 1] = energy[n - 1] as i64;
        let mut best = dp[n - 1];
        for i in (0..n - 1).rev() {
            let nxt = if i + k < n { dp[i + k] } else { 0 };
            dp[i] = energy[i] as i64 + nxt;
            best = best.max(dp[i]);
        }
        best
    }
}
