impl Solution {
    pub fn minimize_max(nums: Vec<i32>, p: i32) -> i32 {
        // An optimal selection can always pair adjacent sorted values, so
        // sort once and ask: does a cap `diff` admit p disjoint pairs? The
        // predicate is monotone in diff — a larger cap only admits more
        // pairs — so binary search the minimum feasible cap over the span.
        let mut sorted = nums.clone();
        sorted.sort();
        let n = sorted.len();
        let can = |diff: i32| -> bool {
            // Greedy scan: take every adjacent pair within diff and skip one
            // element otherwise. Taking each cheap pair is safe (exchange
            // argument), so this counts the maximum pairs under the cap.
            let mut count: usize = 0;
            let mut i = 1;
            while i < n {
                if sorted[i] - sorted[i - 1] <= diff {
                    count += 1;
                    i += 2;
                } else {
                    i += 1;
                }
            }
            count >= p as usize
        };
        let mut lo = 0;
        let mut hi = sorted[n - 1] - sorted[0];
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if can(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
