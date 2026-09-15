impl Solution {
    pub fn sum_of_power(nums: Vec<i32>, k: i32) -> i32 {
        // A subsequence T with sum k and length j is contained in exactly
        // 2^(n-j) subsequences, so the answer is sum_j count[j][k] * 2^(n-j),
        // where count[j][s] counts length-j subsequences of sum s — a 0/1
        // knapsack filled with j and s both descending. Elements above k can
        // never join a sum-k subsequence, so they are skipped outright. The
        // weight products reach ~10^18, so the table and reduction run in
        // i64 throughout.
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let k = k as usize;
        let mut counts = vec![vec![0_i64; k + 1]; n + 1];
        counts[0][0] = 1;
        let mut used = 0_usize;
        for &value in &nums {
            let num = value as usize;
            if num > k {
                continue;
            }
            used += 1;
            for j in (1..=used).rev() {
                for s in (num..=k).rev() {
                    counts[j][s] = (counts[j][s] + counts[j - 1][s - num]) % MOD;
                }
            }
        }
        let mut total: i64 = 0;
        let mut power: i64 = 1;
        for j in (1..=n).rev() {
            total = (total + counts[j][k] * power) % MOD;
            power = power * 2 % MOD;
        }
        total as i32
    }
}
