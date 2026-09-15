impl Solution {
    pub fn increasing_triplet(nums: Vec<i32>) -> bool {
        let n = nums.len();
        if n < 3 {
            return false;
        }
        // left_min[j]: smallest value strictly before j; right_max[j]:
        // largest value strictly after j. The sentinel ends can never
        // satisfy the check, so every position tests uniformly.
        let mut left_min = vec![i64::MAX; n];
        let mut right_max = vec![i64::MIN; n];
        for j in 1..n {
            left_min[j] = left_min[j - 1].min(nums[j - 1] as i64);
        }
        for j in (0..n - 1).rev() {
            right_max[j] = right_max[j + 1].max(nums[j + 1] as i64);
        }
        for j in 0..n {
            if left_min[j] < nums[j] as i64 && (nums[j] as i64) < right_max[j] {
                return true;
            }
        }
        false
    }
}
