impl Solution {
    pub fn max_increasing_groups(usage_limits: Vec<i32>) -> i32 {
        // Strictly increasing lengths force the optimal sizes to be 1..x —
        // trimming a larger group down keeps every condition valid. Number i
        // may appear at most once per group, so across any chosen m groups
        // it supplies at most min(limits[i], m) elements, while the m largest
        // groups (sizes x-m+1..x) demand m*(2*x-m+1)/2. That supply test must
        // hold for EVERY m <= x (the full total alone lies: [4,4,1,1] sums to
        // exactly what four groups need yet cannot staff a 4-group plus a
        // 3-group), and when all of them hold an assignment exists (bipartite
        // feasibility / integral flow). Sort ascending, sweep g[m] =
        // sum(min(v, m)) with a forward pointer, binary search the largest x.
        let mut arr = usage_limits.clone();
        arr.sort_unstable();
        let n = arr.len();
        // g[m] <= 10^5 * 10^9 = 10^14 — beyond 32-bit, keep it i64.
        let mut g = vec![0i64; n + 1];
        let mut p = 0usize;
        for m in 1..=n {
            while p < n && (arr[p] as i64) < m as i64 {
                p += 1;
            }
            // n - p is the count of entries >= m; each adds one element.
            g[m] = g[m - 1] + (n - p) as i64;
        }
        let feasible = |x: usize| -> bool {
            for m in 1..=x {
                if g[m] < (m as i64) * ((2 * x - m + 1) as i64) / 2 {
                    return false;
                }
            }
            true
        };
        let (mut lo, mut hi) = (0usize, n);
        while lo < hi {
            let mid = (lo + hi + 1) / 2;
            if feasible(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
