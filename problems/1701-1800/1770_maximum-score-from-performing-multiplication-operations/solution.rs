impl Solution {
    pub fn maximum_score(nums: Vec<i32>, multipliers: Vec<i32>) -> i32 {
        let m = multipliers.len();
        let n = nums.len();
        let neg_inf = -(1i64 << 60);
        // Base: after all m operations no score remains — stage m is all 0.
        let mut prev = vec![0i64; m + 1];
        let mut cur = vec![neg_inf; m + 1];
        // State (i, l) is complete: l taken from the left forces r = i - l
        // from the right, so the remaining ends are nums[l] and
        // nums[n - 1 - r]. cur's initial -inf (and later stale entries
        // beyond l = i) sit in unreachable slots that are never read.
        for i in (0..m).rev() {
            for l in 0..=i {
                let r = i - l;
                // prev holds stage i + 1: taking the left moves to
                // (i+1, l+1), taking the right to (i+1, l).
                let take_left = prev[l + 1] + multipliers[i] as i64 * nums[l] as i64;
                let take_right = prev[l] + multipliers[i] as i64 * nums[n - 1 - r] as i64;
                cur[l] = if take_left >= take_right { take_left } else { take_right };
            }
            std::mem::swap(&mut prev, &mut cur);
        }
        // State (0, 0): no operations used, nothing taken from the left.
        prev[0] as i32
    }
}
