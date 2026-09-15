impl Solution {
    pub fn maximum_score(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let k = k as usize;
        let mut best = nums[k] as i64;
        // Every good subarray contains k, so grow [lo, hi] outward from
        // (k, k); each intermediate interval is itself a candidate.
        let mut lo = k;
        let mut hi = k;
        let mut cur_min = nums[k] as i64;
        while lo > 0 || hi < n - 1 {
            let cand;
            if lo == 0 {
                hi += 1;
                cand = nums[hi];
            } else if hi == n - 1 {
                lo -= 1;
                cand = nums[lo];
            } else if nums[lo - 1] >= nums[hi + 1] {
                // Take the larger boundary element: both sides end up
                // absorbed anyway, so deferring the smaller one keeps the
                // running minimum as high as possible at the current width.
                lo -= 1;
                cand = nums[lo];
            } else {
                hi += 1;
                cand = nums[hi];
            }
            if (cand as i64) < cur_min {
                cur_min = cand as i64;
            }
            // min x width; scoring every step covers every width 1..n.
            let score = cur_min * (hi - lo + 1) as i64;
            if score > best {
                best = score;
            }
        }
        best as i32
    }
}
