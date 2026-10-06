impl Solution {
    pub fn locate_first_failure(buildInspector: &mut BuildInspector, n: i32) -> i32 {
        // The predicate flips exactly once along [1, n] — good up to the
        // hidden boundary, bad from it on — so bisect for the first true.
        let mut lo: i32 = 1;
        let mut hi: i32 = n;
        while lo < hi {
            // Overflow-safe midpoint: lo + (hi - lo) / 2 never exceeds hi,
            // where (lo + hi) / 2 overflows i32 on the full
            // [1, 2147483647] range.
            let mid = lo + (hi - lo) / 2;
            if buildInspector.is_failing_build(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
