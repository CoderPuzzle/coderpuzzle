impl Solution {
    pub fn num_subseq(mut nums: Vec<i32>, target: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // A subsequence is defined by membership, not order, so sorting loses
        // nothing; validity then depends only on smallest + largest <= target.
        nums.sort_unstable();
        let n = nums.len();
        if n == 0 {
            return 0;
        }
        // Powers of two: elements strictly between the two pointers may be
        // included or excluded freely.
        let mut powers = vec![1i64; n];
        for i in 1..n {
            powers[i] = powers[i - 1] * 2 % MOD;
        }
        let mut total: i64 = 0;
        let (mut lo, mut hi) = (0i64, n as i64 - 1);
        while lo <= hi {
            if nums[lo as usize] + nums[hi as usize] <= target {
                // hi is the farthest legal partner of lo (earlier decrements
                // rule out anything beyond), so 2^(hi-lo) subsequences have
                // their minimum exactly at lo.
                total = (total + powers[(hi - lo) as usize]) % MOD;
                lo += 1;
            } else {
                // nums[hi] is too large to pair with anything at or after lo.
                hi -= 1;
            }
        }
        total as i32
    }
}
