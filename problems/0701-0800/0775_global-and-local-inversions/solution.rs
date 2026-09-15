impl Solution {
    pub fn is_ideal_permutation(nums: Vec<i32>) -> bool {
        // Every local inversion is also a global one, so the two counts are
        // equal exactly when no pair (k, i) with k <= i - 2 has
        // nums[k] > nums[i]. Scan left to right holding the max of
        // nums[0..i-2]; an element below it is such a non-local inversion.
        let mut prefix_max = 0i32;
        for i in 1..nums.len() {
            if nums[i] < prefix_max {
                return false;
            }
            if nums[i - 1] > prefix_max {
                prefix_max = nums[i - 1];
            }
        }
        true
    }
}
