impl Solution {
    // Monotone predicate: sum(r / x) >= k. Binary search the largest
    // feasible x; 0 when even x=1 fails.
    pub fn max_length(ribbons: Vec<i32>, k: i32) -> i64 {
        let mut lo = 1i64;
        let mut hi = 0i64;
        for &r in &ribbons {
            hi = hi.max(r as i64);
        }
        let mut ans = 0i64;
        while lo <= hi {
            let mid = (lo + hi) / 2;
            let pieces: i64 = ribbons.iter().map(|&r| (r as i64) / mid).sum();
            if pieces >= k as i64 {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        ans
    }
}
