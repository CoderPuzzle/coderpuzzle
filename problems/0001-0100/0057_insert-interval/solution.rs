impl Solution {
    pub fn insert(intervals: Vec<Vec<i32>>, newInterval: Vec<i32>) -> Vec<Vec<i32>> {
        // Ownership hands over both allocations, so the output is a fresh
        // vector and the absorbed rows can be moved out of the input.
        let mut merged: Vec<Vec<i32>> = Vec::with_capacity(intervals.len() + 1);
        let n = intervals.len();
        // The new interval is widened in start/end locals so the caller's
        // newInterval is never mutated while it is being absorbed.
        let mut start = newInterval[0];
        let mut end = newInterval[1];
        let mut i = 0;
        // Phase 1 — an interval ending strictly before the new one starts
        // shares no point with it, so every such interval passes through
        // untouched and in order.
        while i < n && intervals[i][1] < start {
            merged.push(intervals[i].clone());
            i += 1;
        }
        // Phase 2 — an interval starting at or before the new end shares at
        // least one point, so it is absorbed by widening [start, end] to
        // cover it. The absorbed intervals are contiguous because the input
        // is sorted by start, so one widening run merges everything.
        while i < n && intervals[i][0] <= end {
            start = start.min(intervals[i][0]);
            end = end.max(intervals[i][1]);
            i += 1;
        }
        merged.push(vec![start, end]);
        // Phase 3 — whatever is left starts strictly after the new end, so
        // it shares no point with the merged interval either and passes
        // through untouched.
        while i < n {
            merged.push(intervals[i].clone());
            i += 1;
        }
        merged
    }
}
