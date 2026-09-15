impl Solution {
    pub fn employee_free_time(schedule: Vec<Vec<Vec<i32>>>) -> Vec<Vec<i32>> {
        // A moment is free exactly when no employee is busy, so only the
        // union matters: pool every interval, forgetting ownership.
        let mut intervals: Vec<(i32, i32)> = schedule
            .iter()
            .flat_map(|employee| employee.iter().map(|interval| (interval[0], interval[1])))
            .collect();
        // Sorted by start (then end), the sweep meets busy blocks in order.
        intervals.sort_unstable();
        let mut free: Vec<Vec<i32>> = Vec::new();
        let mut previous_end: Option<i32> = None;
        for (start, end) in intervals {
            if let Some(prev) = previous_end {
                // Starting strictly beyond the furthest end seen so far
                // proves nothing covers (prev, start); strictness keeps
                // touching intervals continuous (no zero-length gaps).
                if start > prev {
                    free.push(vec![prev, start]);
                }
                // Otherwise merge into the busy block, keeping the running
                // max of ends so a long interval absorbs shorter ones.
                previous_end = Some(prev.max(end));
            } else {
                previous_end = Some(end);
            }
        }
        free
    }
}
