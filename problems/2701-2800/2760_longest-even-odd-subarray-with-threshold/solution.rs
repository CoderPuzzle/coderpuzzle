impl Solution {
    pub fn longest_alternating_subarray(nums: Vec<i32>, threshold: i32) -> i32 {
        let n = nums.len();
        let mut best = 0;
        let mut i = 0;
        while i < n {
            // A window can only open here if nums[i] is even and within the
            // threshold; an odd or over-threshold element never starts a run.
            if nums[i] % 2 != 0 || nums[i] > threshold {
                i += 1;
                continue;
            }
            // Stretch the right edge while parities alternate and every
            // element stays within the threshold.
            let mut j = i + 1;
            while j < n && nums[j] % 2 != nums[j - 1] % 2 && nums[j] <= threshold {
                j += 1;
            }
            best = best.max((j - i) as i32);
            // Sub-windows inside [i, j) are all shorter than this one, so
            // resume at the breaker: if it can start a window, it will.
            i = j;
        }
        best
    }
}
