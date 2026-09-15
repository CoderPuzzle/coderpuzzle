impl Solution {
    pub fn min_subsequence(mut nums: Vec<i32>) -> Vec<i32> {
        // The chosen subsequence must sum to more than half the total.
        // Every element is positive, so taking the largest elements first
        // yields the minimum size and, per size, the maximum sum.
        nums.sort_unstable_by(|a, b| b.cmp(a));
        let total: i32 = nums.iter().sum();
        let mut running = 0;
        for i in 0..nums.len() {
            running += nums[i];
            if running * 2 > total {
                return nums[..=i].to_vec();
            }
        }
        nums
    }
}
