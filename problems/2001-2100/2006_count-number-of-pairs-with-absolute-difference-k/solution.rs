impl Solution {
    pub fn count_k_difference(nums: Vec<i32>, k: i32) -> i32 {
        let mut pairs = 0;
        for first in 0..nums.len() {
            for second in first + 1..nums.len() {
                if (nums[first] - nums[second]).abs() == k {
                    pairs += 1;
                }
            }
        }
        pairs
    }
}
