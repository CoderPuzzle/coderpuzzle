impl Solution {
    pub fn ways_to_split_array(nums: Vec<i32>) -> i32 {
        // A rolling prefix sum plus the precomputed total decides each split
        // in O(1); the right half is simply total - prefix. Prefix sums reach
        // +/-1e10 here, so they stay i64.
        let total: i64 = nums.iter().map(|&x| x as i64).sum();
        let mut prefix: i64 = 0;
        let mut count = 0;
        for i in 0..nums.len() - 1 {
            prefix += nums[i] as i64;
            if prefix >= total - prefix {
                count += 1;
            }
        }
        count
    }
}
