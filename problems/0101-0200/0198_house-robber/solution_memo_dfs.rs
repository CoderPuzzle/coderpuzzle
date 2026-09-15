impl Solution {
    // Top-down mirror of the rolling DP: best(i) = max loot from house i
    // onward. memo[i] caches it (-1 = not computed yet); n <= 100 keeps the
    // recursion depth trivially safe.
    fn best(nums: &[i32], memo: &mut [i32], i: usize) -> i32 {
        // Past the last house there is nothing left to take.
        if i >= nums.len() {
            return 0;
        }
        if memo[i] < 0 {
            // Rob house i (so i+1 is off limits) or skip it.
            let rob = nums[i] + Solution::best(nums, memo, i + 2);
            let skip = Solution::best(nums, memo, i + 1);
            memo[i] = rob.max(skip);
        }
        memo[i]
    }

    pub fn rob(nums: Vec<i32>) -> i32 {
        let mut memo = vec![-1; nums.len()];
        Solution::best(&nums, &mut memo, 0)
    }
}
