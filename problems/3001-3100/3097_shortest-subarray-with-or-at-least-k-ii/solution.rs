impl Solution {
    pub fn minimum_subarray_length(nums: Vec<i32>, k: i32) -> i32 {
        // Validity of a window is downward-closed in its left end (shrinking
        // can only drop bits) and extending r never invalidates a previously
        // valid l, so the shortest valid left end never regresses: two
        // pointers amortize. OR cannot be undone directly, so per-bit counts
        // rebuild the window OR one counter flip at a time on add/remove.
        fn window_or(counts: &[i32]) -> i32 {
            let mut v = 0;
            for b in 0..30 {
                if counts[b] > 0 {
                    v |= 1 << b;
                }
            }
            v
        }
        let mut counts = vec![0i32; 30];
        let mut best = -1;
        let mut left = 0usize;
        for right in 0..nums.len() {
            for b in 0..30 {
                counts[b] += (nums[right] >> b) & 1;
            }
            // Shrink while the window stays special; each recorded length is
            // a candidate, and the one recorded just before the window
            // breaks is the shortest ending here.
            while left <= right && window_or(&counts) >= k {
                let length = (right - left + 1) as i32;
                if best == -1 || length < best {
                    best = length;
                }
                let leaving = nums[left];
                for b in 0..30 {
                    counts[b] -= (leaving >> b) & 1;
                }
                left += 1;
            }
        }
        best
    }
}
