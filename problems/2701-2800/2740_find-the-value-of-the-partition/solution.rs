impl Solution {
    pub fn find_value_of_partition(mut nums: Vec<i32>) -> i32 {
        // A partition's value is the distance between one cross-side pair: the
        // largest element of nums1 against the smallest of nums2. No partition
        // can beat the closest two values in the whole array, and a split
        // around that closest sorted pair realizes it exactly.
        nums.sort_unstable();
        let mut best = i32::MAX;
        for i in 1..nums.len() {
            // Values are at most 10^9 apart, so every gap fits an i32 as is.
            best = best.min(nums[i] - nums[i - 1]);
        }
        best
    }
}
