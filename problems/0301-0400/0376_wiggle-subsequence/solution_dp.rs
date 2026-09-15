impl Solution {
    // An alternating subsequence is always in one of two states: its last
    // step rose, or its last step fell. Keep the best length reached in each
    // state; a rise extends the opposite state, a fall extends the rising
    // one, and equal neighbors extend nothing.
    pub fn wiggle_max_length(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // up[i]: best within the first i + 1 elements ending on a rise;
        // down[i]: the symmetric best ending on a fall.
        let mut up = vec![1i32; n];
        let mut down = vec![1i32; n];
        for i in 1..n {
            if nums[i] > nums[i - 1] {
                up[i] = down[i - 1] + 1;
                down[i] = down[i - 1];
            } else if nums[i] < nums[i - 1] {
                down[i] = up[i - 1] + 1;
                up[i] = up[i - 1];
            } else {
                up[i] = up[i - 1];
                down[i] = down[i - 1];
            }
        }
        up[n - 1].max(down[n - 1])
    }
}
