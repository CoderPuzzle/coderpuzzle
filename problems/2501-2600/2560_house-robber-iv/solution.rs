impl Solution {
    pub fn min_capability(nums: Vec<i32>, k: i32) -> i32 {
        let mut lo = i32::MAX;
        let mut hi = i32::MIN;
        for &x in &nums {
            lo = lo.min(x);
            hi = hi.max(x);
        }
        // "k non-adjacent houses all <= cap" is monotone in cap, so binary
        // search the smallest feasible cap over the value range [min, max] —
        // raw values, so nums needs no sorting. Lower-mid since we minimize.
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if Self::feasible(&nums, mid, k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }

    fn feasible(nums: &[i32], cap: i32, k: i32) -> bool {
        // Greedy scan: take every house that fits under the cap and skip its
        // neighbor. Taking an eligible house is never worse than skipping it
        // — skipping forfeits a pick without unlocking a better one — so this
        // counts the maximum non-adjacent picks.
        let mut count = 0;
        let mut i = 0;
        while i < nums.len() {
            if nums[i] <= cap {
                count += 1;
                i += 2;
            } else {
                i += 1;
            }
        }
        count >= k
    }
}
