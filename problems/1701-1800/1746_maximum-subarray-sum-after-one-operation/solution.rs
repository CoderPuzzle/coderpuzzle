impl Solution {
    pub fn max_sum_after_operation(nums: Vec<i32>) -> i32 {
        // dp0: best subarray sum ending here with no square; dp1: best
        // with exactly one square. The answer is the largest dp1 over all
        // ending positions. Sums stay below i32::MAX (a subarray of at
        // most 1e5 elements with one square tops out near 1.1e9).
        let mut dp0 = nums[0];
        let mut dp1 = nums[0] * nums[0];
        let mut answer = dp1;
        for &v in &nums[1..] {
            let nxt0 = v.max(dp0 + v);
            let nxt1 = (v * v).max(dp0 + v * v).max(dp1 + v);
            dp0 = nxt0;
            dp1 = nxt1;
            answer = answer.max(dp1);
        }
        answer
    }
}
