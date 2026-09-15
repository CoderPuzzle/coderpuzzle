impl Solution {
    pub fn longest_subarray(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // pref[i] is the longest non-decreasing run ending at i; suff[i]
        // is the longest non-decreasing run starting at i.
        let mut pref = vec![1_usize; n];
        let mut suff = vec![1_usize; n];
        for i in 1..n {
            if nums[i - 1] <= nums[i] {
                pref[i] = pref[i - 1] + 1;
            }
        }
        for i in (0..n.saturating_sub(1)).rev() {
            if nums[i] <= nums[i + 1] {
                suff[i] = suff[i + 1] + 1;
            }
        }
        // No replacement spent: the best untouched run.
        let mut ans = 0_usize;
        for i in 0..n {
            ans = ans.max(pref[i]).max(suff[i]);
        }
        // Replace nums[p] to extend a single side; the new value is an
        // unbounded integer, so each direction alone is always feasible.
        for p in 1..n {
            ans = ans.max(pref[p - 1] + 1);
        }
        for p in 0..n.saturating_sub(1) {
            ans = ans.max(suff[p + 1] + 1);
        }
        // Bridging both sides needs a value between the neighbors, which
        // exists exactly when nums[p-1] <= nums[p+1].
        for p in 1..n.saturating_sub(1) {
            if nums[p - 1] <= nums[p + 1] {
                ans = ans.max(pref[p - 1] + suff[p + 1] + 1);
            }
        }
        ans as i32
    }
}
