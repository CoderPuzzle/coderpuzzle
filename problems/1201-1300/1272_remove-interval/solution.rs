impl Solution {
    pub fn remove_interval(intervals: Vec<Vec<i32>>, to_be_removed: Vec<i32>) -> Vec<Vec<i32>> {
        // Per interval, three outcomes: disjoint from the removal (keep
        // whole), straddling the left edge (keep head), or straddling the
        // right edge (keep tail); a full cover keeps nothing. An interval
        // can only ever be cut into two pieces, never more.
        let remove_start = to_be_removed[0];
        let remove_end = to_be_removed[1];
        let mut kept: Vec<Vec<i32>> = Vec::new();
        for interval in &intervals {
            let start = interval[0];
            let end = interval[1];
            if start >= remove_end || end <= remove_start {
                kept.push(interval.clone());
                continue;
            }
            if start < remove_start {
                kept.push(vec![start, remove_start]);
            }
            if end > remove_end {
                kept.push(vec![remove_end, end]);
            }
        }
        kept
    }
}
