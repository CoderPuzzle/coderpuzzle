impl Solution {
    pub fn can_make_equal(nums: Vec<i32>, k: i32) -> bool {
        // Position i is touched only by the flips at i - 1 and at i, so
        // scanning left to right every flip is forced: prev remembers
        // whether the flip at i - 1 fired, and the flip at i must fire
        // exactly when the resulting value misses the target.
        let can_make = |target: i32| -> bool {
            let mut ops = 0;
            let mut prev = false;
            for value in &nums[..nums.len() - 1] {
                prev = *value * (if prev { -1 } else { 1 }) != target;
                if prev {
                    ops += 1;
                }
            }
            // The last element has no flip of its own left: the target is
            // only reachable if it already came out right.
            let last = nums[nums.len() - 1] * (if prev { -1 } else { 1 });
            last == target && ops <= k
        };
        can_make(1) || can_make(-1)
    }
}
