impl Solution {
    pub fn remove_covered_intervals(mut intervals: Vec<Vec<i32>>) -> i32 {
        // Sort by start ascending, end DESCENDING: then any interval whose
        // end is not beyond the best end seen so far must sit inside some
        // earlier interval (equal starts sort the wider one first, so the
        // narrower twin is correctly counted as covered).
        intervals.sort_by(|a, b| (a[0], -a[1]).cmp(&(b[0], -b[1])));
        let mut remaining = 0i32;
        let mut best_end = 0i64;
        for interval in &intervals {
            let end = interval[1] as i64;
            if end > best_end {
                remaining += 1;
                best_end = end;
            }
        }
        remaining
    }
}
