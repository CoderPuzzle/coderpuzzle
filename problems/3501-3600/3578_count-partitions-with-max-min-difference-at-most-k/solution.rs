use std::collections::VecDeque;

impl Solution {
    pub fn count_partitions(nums: Vec<i32>, k: i32) -> i32 {
        // dp[i + 1] = ways to partition the first i + 1 elements. The last
        // segment is nums[j..i] for some start j; valid starts form a
        // contiguous range ending at i, grown by lowering lo until the
        // window spread is <= k. Monotonic deques expose the window
        // min/max, pre holds prefix sums of dp so a range sum is one
        // subtraction.
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let mut dp = vec![0i64; n + 1];
        let mut pre = vec![0i64; n + 2];
        dp[0] = 1;
        pre[1] = 1;
        let mut lo: usize = 0;
        let mut mins: VecDeque<usize> = VecDeque::new(); // values rising
        let mut maxs: VecDeque<usize> = VecDeque::new(); // values falling
        for i in 0..n {
            while let Some(&back) = mins.back() {
                if nums[back] < nums[i] {
                    break;
                }
                mins.pop_back();
            }
            mins.push_back(i);
            while let Some(&back) = maxs.back() {
                if nums[back] > nums[i] {
                    break;
                }
                maxs.pop_back();
            }
            maxs.push_back(i);
            while nums[*maxs.front().unwrap()] - nums[*mins.front().unwrap()] > k {
                if *mins.front().unwrap() == lo {
                    mins.pop_front();
                }
                if *maxs.front().unwrap() == lo {
                    maxs.pop_front();
                }
                lo += 1;
            }
            dp[i + 1] = (pre[i + 1] - pre[lo] + MOD) % MOD;
            pre[i + 2] = (pre[i + 1] + dp[i + 1]) % MOD;
        }
        dp[n] as i32
    }
}
