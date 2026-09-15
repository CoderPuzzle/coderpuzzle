// Only the merged components matter: sort the intervals, merge the
// overlapping ones, and the answer is the component count minus the largest
// number of consecutive components one new interval can straddle. A new
// interval of length at most k joins components l through r exactly when
// their end-to-end span, c_r.start - c_l.end, is at most k (the interval
// must reach across every component in between, not just the empty gaps).
// Both endpoint bounds move monotonically, so two pointers find the widest
// valid window: advance the right end and shrink from the left while the
// span exceeds k. All coordinates fit in i32, so every span does too (the
// span is at most 10^9).
impl Solution {
    pub fn min_connected_groups(intervals: Vec<Vec<i32>>, k: i32) -> i32 {
        let mut intervals = intervals;
        intervals.sort();
        let mut merged: Vec<Vec<i32>> = Vec::with_capacity(intervals.len());
        for interval in intervals {
            match merged.last_mut() {
                Some(last) if interval[0] <= last[1] => {
                    if interval[1] > last[1] {
                        last[1] = interval[1];
                    }
                }
                _ => merged.push(interval),
            }
        }
        let mut best = 0usize;
        let mut left = 0usize;
        for right in 0..merged.len() {
            while (merged[right][0] - merged[left][1]) as i64 > k as i64 {
                left += 1;
            }
            best = best.max(right - left);
        }
        (merged.len() - best) as i32
    }
}
