impl Solution {
    pub fn min_taps(n: i32, ranges: Vec<i32>) -> i32 {
        // Each tap becomes the interval [i-r, i+r] clamped to [0, n]; the task
        // is the classic minimum-interval-cover of the garden segment.
        let mut intervals: Vec<(i32, i32)> = ranges
            .iter()
            .enumerate()
            .map(|(i, &r)| ((i as i32 - r).max(0), (i as i32 + r).min(n)))
            .collect();
        // Sorting by left endpoint makes the sweep a single pass.
        intervals.sort();
        let total = intervals.len();
        let mut count = 0;
        let mut covered = 0;
        let mut i = 0;
        while covered < n {
            // Among all intervals that start at or before the watered prefix,
            // take the farthest reach — the jump-game argument: any solution
            // must cross the current boundary, and the farthest reach leaves
            // the most room for the remaining cover.
            let mut reach = covered;
            while i < total && intervals[i].0 <= covered {
                reach = reach.max(intervals[i].1);
                // Once an interval's start exceeds `covered` it exceeds every
                // earlier value too, so i is never revisited.
                i += 1;
            }
            if reach == covered {
                // No interval connects to the watered prefix: unwatered gap.
                return -1;
            }
            covered = reach;
            count += 1;
        }
        count
    }
}
