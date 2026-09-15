impl Solution {
    pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Copy, then sort by start (Vec's lexicographic order uses end as
        // tiebreaker): any interval overlapping an earlier one must overlap
        // or touch the most recent merged interval, so a sweep tracking
        // only the last merged interval suffices. Sorting the clone leaves
        // the input untouched.
        let mut ordered = intervals.clone();
        ordered.sort();
        let mut merged: Vec<Vec<i32>> = Vec::new();
        for interval in ordered {
            let start = interval[0];
            let end = interval[1];
            // `<=` counts touching intervals as overlapping, as required.
            // The start is already covered, so only the right edge matters:
            // raise it when larger (a fully swallowed interval leaves it
            // untouched), then skip the push below via `continue`.
            if let Some(last) = merged.last_mut() {
                if start <= last[1] {
                    if end > last[1] {
                        last[1] = end;
                    }
                    continue;
                }
            }
            // No overlap with the last merged interval: new group.
            merged.push(vec![start, end]);
        }
        merged
    }
}
