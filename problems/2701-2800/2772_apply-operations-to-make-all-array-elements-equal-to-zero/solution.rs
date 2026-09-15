impl Solution {
    pub fn check_array(nums: Vec<i32>, k: i32) -> bool {
        let n = nums.len();
        let k = k as usize;
        let mut diff = vec![0i64; n + 1];
        // running: net number of still-active windows covering i (a
        // difference array recovers it in O(1)). Operations can be replayed
        // left to right: the leftmost nonzero cell can only be reduced by a
        // window starting exactly there.
        let mut running: i64 = 0;
        for i in 0..n {
            running += diff[i];
            // Residual after the already-started windows.
            let cur = nums[i] as i64 - running;
            // Negative: earlier windows over-decremented this cell, and no
            // later operation can undo that.
            if cur < 0 {
                return false;
            }
            if cur == 0 {
                continue;
            }
            // Positive: exactly cur new windows must start at i (nothing
            // further left can help) — they must fit before the array ends.
            if i + k > n {
                return false;
            }
            running += cur;
            diff[i + k] -= cur;
        }
        true
    }
}
