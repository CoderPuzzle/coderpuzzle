impl Solution {
    pub fn number_of_good_subsets(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        const PRIMES: [i32; 10] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

        // Compress to frequencies: subsets are distinguished by index, so
        // equal values contribute multiplicity.
        let mut count: std::collections::HashMap<i32, i64> = std::collections::HashMap::new();
        for &v in &nums {
            *count.entry(v).or_insert(0) += 1;
        }

        let size = 1usize << 10;
        // dp[mask] = ways to pick indices whose product's prime set is
        // exactly mask -- a 0/1-knapsack over prime masks.
        let mut dp = vec![0i64; size];
        dp[0] = 1;
        for (&value, &freq) in count.iter() {
            if value == 1 {
                // empty mask; handled separately at the end
                continue;
            }
            // Map the value onto its 10-bit prime mask; reject values
            // divisible by a prime square (4, 8, 9, ...).
            let mut mask = 0usize;
            let mut bad = false;
            let mut x = value;
            for (i, &p) in PRIMES.iter().enumerate() {
                if x % p == 0 {
                    mask |= 1 << i;
                    x /= p;
                    if x % p == 0 {
                        bad = true;
                        break;
                    }
                }
            }
            if bad || mask == 0 {
                continue;
            }
            // Decreasing mask order keeps one value from being used twice in
            // a subset; only disjoint states (no shared prime) may extend.
            for prev in (0..size).rev() {
                if dp[prev] != 0 && prev & mask == 0 {
                    dp[prev | mask] = (dp[prev | mask] + dp[prev] * freq) % MOD;
                }
            }
        }
        // Good subsets need at least one prime: sum every non-empty mask.
        // Each 1 freely appends to any good subset without changing the
        // product: a factor 2^count[1].
        let mut total: i64 = 0;
        for i in 1..size {
            total = (total + dp[i]) % MOD;
        }
        let ones = *count.get(&1).unwrap_or(&0);
        let mut pow: i64 = 1;
        for _ in 0..ones {
            pow = pow * 2 % MOD;
        }
        (total * pow % MOD) as i32
    }
}
