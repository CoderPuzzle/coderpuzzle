impl Solution {
    pub fn alternating_subarray(nums: Vec<i32>) -> i32 {
        // Track cur, the length of the alternating run ending at i. Its next
        // delta must be +1 when cur is odd and -1 when cur is even.
        let mut best = -1;
        let mut cur = 1;
        for i in 1..nums.len() {
            let need = if cur % 2 == 1 { 1 } else { -1 };
            let delta = nums[i] - nums[i - 1];
            if delta == need {
                cur += 1;
            } else if delta == 1 {
                // A +1 pair is a fresh run starting at i - 1: restart there,
                // not at i, or [2,3,4,3,4] loses its second half.
                cur = 2;
            } else {
                cur = 1;
            }
            if cur > 1 {
                best = best.max(cur);
            }
        }
        best
    }
}
