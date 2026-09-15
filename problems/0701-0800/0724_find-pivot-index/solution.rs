impl Solution {
    pub fn pivot_index(nums: Vec<i32>) -> i32 {
        // One pass over prefix sums: the total and a running left sum give
        // both sides of index i, since right = total - left - nums[i].
        let total: i32 = nums.iter().sum();
        let mut left = 0;
        for (i, &x) in nums.iter().enumerate() {
            if left == total - left - x {
                // The first qualifying index is the leftmost by construction.
                return i as i32;
            }
            left += x;
        }
        -1
    }
}
