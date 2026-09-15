impl Solution {
    // Bounded knapsack over score: dp[p] counts ways to hit exactly p
    // points with the types processed so far; each type opens a fresh
    // row so indistinguishable questions only contribute take-counts
    // q <= min(count, points / marks). Sums of <= 51 residues below
    // 10^9 + 7 stay under 5.5e10 -- comfortably inside i64 before the
    // single reduction.
    pub fn ways_to_reach_target(target: i32, types: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let target = target as usize;
        let mut dp = vec![0i64; target + 1];
        dp[0] = 1;
        for kind in &types {
            let (count, marks) = (kind[0] as usize, kind[1] as usize);
            let mut nxt = vec![0i64; target + 1];
            for (points, slot) in nxt.iter_mut().enumerate() {
                let max_take = count.min(points / marks);
                let total: i64 = (0..=max_take).map(|taken| dp[points - taken * marks]).sum();
                *slot = total % MOD;
            }
            dp = nxt;
        }
        dp[target] as i32
    }
}
