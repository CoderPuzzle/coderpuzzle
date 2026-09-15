impl Solution {
    pub fn number_of_subarrays(nums: Vec<i32>, k: i32) -> i32 {
        // "Exactly k odds" resists a direct window: one odd arrival can
        // break the contract with no symmetric way back. "At most cap odds"
        // repairs any breach from the left, and exactly k is the subtraction
        // of one such budget from a slightly larger one.
        (Self::at_most(&nums, k) - Self::at_most(&nums, k - 1)) as i32
    }

    // Counts subarrays holding at most cap odds: with [left, right]
    // inside the budget and left the smallest such start, every
    // opening from left onward qualifies, so right - left + 1
    // subarrays ending here join the total.
    // Never taken under the statement's k >= 1; it lets the helper
    // answer on its own terms.
    fn at_most(nums: &[i32], cap: i32) -> i64 {
        if cap < 0 {
            return 0;
        }
        let mut left = 0usize;
        let mut odds = 0;
        let mut total: i64 = 0;
        for right in 0..nums.len() {
            odds += nums[right] & 1;
            // An odd broke the budget: retire odds from the left until
            // it holds again. Both ends only ever advance, so the sweep
            // stays linear.
            while odds > cap {
                odds -= nums[left] & 1;
                left += 1;
            }
            // Signed arithmetic on purpose: with cap == 0 the left end can
            // sit one past right, where a usize subtraction would wrap.
            total += right as i64 - left as i64 + 1;
        }
        total
    }
}
