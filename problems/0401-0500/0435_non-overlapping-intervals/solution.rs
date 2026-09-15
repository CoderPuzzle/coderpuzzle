impl Solution {
    pub fn erase_overlap_intervals(intervals: Vec<Vec<i32>>) -> i32 {
        let mut ordered = intervals;
        ordered.sort_by_key(|iv| iv[1]);
        // Minimizing removals = maximizing kept non-overlapping intervals, so
        // sweep by earliest end: keeping the earliest-ending candidate leaves
        // the most room for everything after it.
        let mut removed = 0i32;
        // Sentinel below any real endpoint (endpoints may be negative).
        let mut prev_end = i64::MIN;
        for iv in &ordered {
            // Touching endpoints do not overlap, so start == prev_end keeps.
            if iv[0] as i64 >= prev_end {
                prev_end = iv[1] as i64;
            } else {
                // Discarded: it intersects the last kept (earliest-ending)
                // interval, so one removal per conflict is exactly optimal.
                removed += 1;
            }
        }
        removed
    }
}
