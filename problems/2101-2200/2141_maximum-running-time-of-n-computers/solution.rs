impl Solution {
    pub fn max_run_time(n: i32, batteries: Vec<i32>) -> i64 {
        let n = n as i64;
        let sum: i64 = batteries.iter().map(|&b| b as i64).sum();
        let feasible = |t: i64| -> bool {
            // Over a t-minute horizon a battery powers one computer at a
            // time, so it contributes at most min(b, t) computer-minutes;
            // the capped pool is freely schedulable, and n computers for t
            // minutes need exactly n*t.
            let total: i64 = batteries.iter().map(|&b| (b as i64).min(t)).sum();
            total >= n * t
        };
        // Feasibility is monotone in t, so binary search the largest t; the
        // total charge over n computers is an absolute ceiling.
        let mut lo = 0i64;
        let mut hi = sum / n;
        while lo < hi {
            // Upper-mid keeps the search converging on the max feasible value.
            let mid = (lo + hi + 1) / 2;
            if feasible(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo
    }
}
