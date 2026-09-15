impl Solution {
    pub fn min_patches(nums: Vec<i32>, n: i32) -> i32 {
        let mut patches = 0i32;
        let mut i = 0usize;
        // Invariant: every sum in [1, reachable) is formable; reachable
        // itself is the smallest sum that is not.
        let mut reachable: i64 = 1;
        while reachable <= n as i64 {
            // Consume nums[i] while it fits inside the covered range: it
            // extends coverage to [1, reachable + nums[i]) at no patch cost.
            if i < nums.len() && nums[i] as i64 <= reachable {
                reachable += nums[i] as i64;
                i += 1;
            } else {
                // Genuine gap: patch reachable itself (any smaller patch
                // covers less, any larger leaves the gap) and double.
                reachable += reachable;
                patches += 1;
            }
        }
        patches
    }
}
