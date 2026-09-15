impl Solution {
    pub fn die_simulator(n: i32, roll_max: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // dp[j][c]: sequences of the current length ending with face j
        // repeated exactly c times (roll_max[i] <= 15, so 16 columns suffice)
        let mut dp = vec![vec![0i64; 16]; 6];
        // base: one single-roll sequence per face
        for j in 0..6 {
            dp[j][1] = 1;
        }
        for _ in 2..=n {
            let mut nxt = vec![vec![0i64; 16]; 6];
            // per-face totals and grand total, from the previous table
            let mut totals = [0i64; 6];
            let mut grand: i64 = 0;
            for j in 0..6 {
                for c in 0..16 {
                    totals[j] += dp[j][c];
                }
                grand += totals[j];
            }
            for j in 0..6 {
                let limit = roll_max[j] as usize;
                // extending a run shifts counts up one column; never writing
                // past roll_max[j] is what keeps overlong runs impossible
                for c in 2..=limit.min(15) {
                    nxt[j][c] = dp[j][c - 1];
                }
                // fresh run of face j: any sequence ending in a different face
                nxt[j][1] = ((grand - totals[j]).rem_euclid(MOD)) % MOD;
            }
            dp = nxt;
        }
        // each legal sequence lands in exactly one cell (final face, run len)
        let mut answer: i64 = 0;
        for row in &dp {
            for &value in row {
                answer = (answer + value) % MOD;
            }
        }
        answer as i32
    }
}
