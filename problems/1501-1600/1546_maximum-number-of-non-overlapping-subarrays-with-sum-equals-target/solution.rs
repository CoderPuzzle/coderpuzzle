use std::collections::HashSet;

impl Solution {
    pub fn max_non_overlapping(nums: Vec<i32>, target: i32) -> i32 {
        // `seen` holds every prefix sum reachable from the start of the
        // current "segment" (the region after the last subarray taken).
        // The moment the running sum minus `target` is in `seen`, a
        // subarray ending here sums to `target`; taking it immediately and
        // resetting (prefix sum back to 0, `seen` back to just {0}) is
        // optimal, because closing off a valid subarray as early as
        // possible never removes an opportunity a later close would have
        // had — it can only free up more room for subarrays after it.
        // `prefix_sum` is i64: up to 10^5 terms each up to 10^4 in
        // magnitude can sum to roughly 10^9, close enough to the i32 range
        // to be worth avoiding.
        let mut seen: HashSet<i64> = HashSet::new();
        seen.insert(0);
        let mut prefix_sum: i64 = 0;
        let mut count = 0;
        let target = target as i64;
        for x in nums {
            prefix_sum += x as i64;
            if seen.contains(&(prefix_sum - target)) {
                count += 1;
                seen.clear();
                seen.insert(0);
                prefix_sum = 0;
            } else {
                seen.insert(prefix_sum);
            }
        }
        count
    }
}
