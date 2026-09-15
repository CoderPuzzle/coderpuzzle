impl Solution {
    pub fn longest_monotonic_subarray(nums: Vec<i32>) -> i32 {
        let mut best = 1;
        let mut inc = 1;
        let mut dec = 1;
        for index in 1..nums.len() {
            if nums[index] > nums[index - 1] {
                inc += 1;
                dec = 1;
            } else if nums[index] < nums[index - 1] {
                dec += 1;
                inc = 1;
            } else {
                inc = 1;
                dec = 1;
            }
            best = best.max(inc).max(dec);
        }
        best
    }
}
