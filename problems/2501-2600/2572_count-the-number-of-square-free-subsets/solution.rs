impl Solution {
    pub fn square_free_subsets(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        const PRIMES: [i32; 10] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        let mut counts = vec![0i64; 31];
        for &v in &nums {
            counts[v as usize] += 1;
        }
        // dp[mask] = ways to pick a square-free set of numbers (at most one copy
        // of each value, values > 1) whose combined prime factors are `mask`.
        let mut dp = vec![0i64; 1 << 10];
        dp[0] = 1;
        for value in 2..=30usize {
            let cnt = counts[value];
            if cnt == 0 {
                continue;
            }
            let value = value as i64;
            let mut mask = 0usize;
            let mut usable = true;
            for (i, &p) in PRIMES.iter().enumerate() {
                let p = p as i64;
                if value % p == 0 {
                    if value % (p * p) == 0 {
                        usable = false;
                        break;
                    }
                    mask |= 1 << i;
                }
            }
            if !usable {
                continue; // contains a squared prime factor; never usable
            }
            let mut ndp = dp.clone();
            for m in 0..(1usize << 10) {
                if dp[m] != 0 && (m & mask) == 0 {
                    let t = m | mask;
                    ndp[t] = (ndp[t] + dp[m] * cnt) % MOD;
                }
            }
            dp = ndp;
        }

        let mut ways: i64 = 0;
        for &x in &dp {
            ways = (ways + x) % MOD;
        }
        let ones = counts[1] as usize;
        if ones > 0 {
            let mut factor: i64 = 1;
            for _ in 0..ones {
                factor = factor * 2 % MOD;
            }
            ways = ways * factor % MOD;
        }
        ways = (ways - 1).rem_euclid(MOD); // drop the empty subset
        ways as i32
    }
}
