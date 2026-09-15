impl Solution {
    pub fn minimum_sum(nums: Vec<i32>) -> i32 {
        // The best mountain through a peak j pairs nums[j] with the smallest
        // value on each side, so running minima from both ends bracket every
        // candidate; both side values must sit strictly below the peak.
        let n = nums.len();
        let mut left_min = nums.clone();
        for i in 1..n {
            left_min[i] = left_min[i - 1].min(nums[i]);
        }
        let mut right_min = nums.clone();
        for i in (0..n - 1).rev() {
            right_min[i] = right_min[i + 1].min(nums[i]);
        }
        let mut best = -1;
        for j in 1..n - 1 {
            let (lo, hi) = (left_min[j - 1], right_min[j + 1]);
            if lo < nums[j] && hi < nums[j] {
                let total = lo + nums[j] + hi;
                if best == -1 || total < best {
                    best = total;
                }
            }
        }
        best
    }
}
