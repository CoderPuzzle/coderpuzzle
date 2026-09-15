impl Solution {
    pub fn count_partitions(nums: Vec<i32>, k: i32) -> i32 {
        // Reverse view per the hint: a partition fails when either
        // group's sum lands under k, and both failures coincide only if
        // the total is under 2*k -- then zero great partitions exist
        // outright. Otherwise every subset with sum < k names one
        // failure per side, so the answer is 2^n minus twice their count.
        const MOD: i64 = 1_000_000_007;
        let mut total: i64 = nums.iter().map(|&v| v as i64).sum();
        if total < 2 * k as i64 {
            return 0;
        }
        // ways[s] holds, mod p, how many subsets of the processed prefix
        // sum to s; rows at k and beyond can never come back below k.
        let k = k as usize;
        let mut ways = vec![0i64; k];
        ways[0] = 1;
        for &value in &nums {
            let value = value as usize;
            for s in (value..k).rev() {
                ways[s] = (ways[s] + ways[s - value]) % MOD;
            }
        }
        // Fewer than 1000 rows below the modulus: summing them is safe.
        let below = ways.iter().sum::<i64>() % MOD;
        let mut power: i64 = 1;
        for _ in 0..nums.len() {
            power = power * 2 % MOD;
        }
        ((power - 2 * below % MOD + MOD) % MOD) as i32
    }
}
