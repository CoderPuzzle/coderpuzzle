impl Solution {
    pub fn min_removal(mut nums: Vec<i32>, k: i32) -> i32 {
        // Sort so the best survivor set is a contiguous window: it is
        // balanced exactly when nums[j] <= nums[i] * k at its ends, and the
        // longest such window keeps the most elements.
        nums.sort_unstable();
        let n = nums.len();
        let mut best = 0usize;
        let mut left = 0usize;
        for right in 0..n {
            // A one-element window is always balanced, so left never passes
            // right. The product reaches 1e14 — beyond i32 range, so widen
            // before multiplying.
            while (nums[right] as i64) > (nums[left] as i64) * (k as i64) {
                left += 1;
            }
            best = best.max(right - left + 1);
        }
        (n - best) as i32
    }
}
