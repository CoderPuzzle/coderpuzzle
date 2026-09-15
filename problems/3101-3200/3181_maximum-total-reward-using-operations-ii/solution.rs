impl Solution {
    pub fn max_total_reward(reward_values: Vec<i32>) -> i32 {
        // Sort and dedupe; a duplicate value can never be taken twice
        // (it would require value > running total >= value).
        let mut values = reward_values.clone();
        values.sort_unstable();
        values.dedup();
        let maxv = *values.last().unwrap() as usize;

        // Bitset DP over totals < 2*maxv, stored as 64-bit words.
        let words = (2 * maxv) / 64 + 2;
        let mut dp = vec![0u64; words];
        dp[0] = 1;
        for &xv in &values {
            let x = xv as usize;
            let w = x / 64;
            let b = (x % 64) as u32;
            // shifted = (dp & ((1<<x)-1)) << x, or'ed into dp.
            // Read source words high-to-low so writes never corrupt a source.
            let mut i: i64 = w as i64;
            while i >= 0 {
                let idx = i as usize;
                let mut low = dp[idx];
                if idx == w {
                    low &= if b == 0 { 0 } else { (1u64 << b) - 1 };
                }
                let t = idx + w;
                if t < words {
                    dp[t] |= low << b;
                }
                if b != 0 && t + 1 < words {
                    dp[t + 1] |= low >> (64 - b);
                }
                i -= 1;
            }
        }
        for wi in (0..words).rev() {
            if dp[wi] != 0 {
                return (wi * 64 + 63 - dp[wi].leading_zeros() as usize) as i32;
            }
        }
        0
    }
}
