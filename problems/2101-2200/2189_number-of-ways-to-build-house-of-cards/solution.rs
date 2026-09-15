impl Solution {
    pub fn house_of_cards(n: i32) -> i32 {
        // Rows shrink going up; a row of k triangles costs 3k - 1 cards.
        // Iterative DP over (cards remaining, row bound above).
        const MOD: i64 = 1_000_000_007;
        let size = n as usize;
        let mut dp = vec![vec![0i64; size + 2]; size + 1];
        for allowed in 0..=size + 1 {
            dp[0][allowed] = 1;
        }
        for remaining in 2..=size {
            for allowed in 1..=size {
                let mut total = 0i64;
                let mut k = 1usize;
                while k <= allowed && 3 * k - 1 <= remaining {
                    let used = 3 * k - 1;
                    if used == remaining {
                        total += 1;
                    } else {
                        total += dp[remaining - used][k - 1];
                    }
                    k += 1;
                }
                dp[remaining][allowed] = total % MOD;
            }
        }
        dp[size][size] as i32
    }
}
