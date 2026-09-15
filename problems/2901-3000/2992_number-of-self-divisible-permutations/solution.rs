impl Solution {
    // Position i (1-indexed) may receive value v exactly when gcd(v, i) is 1.
    // Precompute that compatibility grid once, then count valid permutations
    // with a subset DP: dp[mask] is the number of ways to fill the first
    // popcount(mask) positions using exactly the values in mask, so extending
    // by the last-placed value v gives dp[mask] = sum over compatible v in
    // mask of dp[mask without v]. Even the theoretical bound 12! fits an i32.
    pub fn self_divisible_permutation_count(n: i32) -> i32 {
        let n = n as usize;
        let mut compat = vec![vec![false; n]; n];
        for i in 1..=n {
            for v in 1..=n {
                compat[i - 1][v - 1] = Solution::gcd(v as i32, i as i32) == 1;
            }
        }
        let full = 1usize << n;
        let mut dp = vec![0i32; full];
        dp[0] = 1;
        for mask in 1..full {
            let pos = mask.count_ones() as usize; // 1-indexed position being filled now
            let row = &compat[pos - 1];
            let mut total = 0;
            for v in 0..n {
                if (mask >> v) & 1 == 1 && row[v] {
                    total += dp[mask ^ (1 << v)];
                }
            }
            dp[mask] = total;
        }
        dp[full - 1]
    }

    fn gcd(mut a: i32, mut b: i32) -> i32 {
        while b != 0 {
            let t = a % b;
            a = b;
            b = t;
        }
        a
    }
}
