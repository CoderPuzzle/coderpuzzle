impl Solution {
    pub fn sum_subseq_widths(mut nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // Width = max - min, so the total is the sum of subsequence maxes
        // minus mins; sorting loses nothing (inner order is irrelevant).
        nums.sort_unstable();
        let n = nums.len();
        let mut pow2 = vec![1i64; n];
        for i in 1..n {
            pow2[i] = pow2[i - 1] * 2 % MOD;
        }
        let mut total: i64 = 0;
        for i in 0..n {
            // nums[i] is the max of 2^i subsequences (partners chosen before
            // it) and the min of 2^(n-1-i); each subsequence is booked to
            // exactly one index per role. The extra +MOD repairs the possibly
            // negative difference of the two powers.
            let d = pow2[i] - pow2[n - 1 - i];
            total = ((total + nums[i] as i64 * d) % MOD + MOD) % MOD;
        }
        total as i32
    }
}
