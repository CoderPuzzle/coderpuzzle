impl Solution {
    pub fn find_max_consecutive_ones(nums: Vec<i32>) -> i32 {
        // Flipping a 0 turns it into a 1 for free, so a stretch can be
        // made all-ones exactly when it holds at most one 0: sweep for
        // the longest such window. Grow it one element at a time on the
        // right; when a second 0 slips in, advance the left edge until
        // the earlier 0 drops out and the one-flip budget is restored.
        // The largest window seen is the answer.
        let mut best = 0usize;
        let mut left = 0usize;
        let mut zeros = 0;
        for (right, &value) in nums.iter().enumerate() {
            if value == 0 {
                zeros += 1;
            }
            while zeros > 1 {
                if nums[left] == 0 {
                    zeros -= 1;
                }
                left += 1;
            }
            best = best.max(right - left + 1);
        }
        best as i32
    }
}
