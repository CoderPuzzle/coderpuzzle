impl Solution {
    pub fn max_value(events: Vec<Vec<i32>>, k: i32) -> i64 {
        // Sorted by end day, any compatible set read by finish time is a
        // subsequence of this order, so earlier choices sit to the left.
        let mut events = events;
        events.sort_by_key(|e| e[1]);
        let n = events.len();
        let ends: Vec<i32> = events.iter().map(|e| e[1]).collect();
        // prev[i]: best value using the first i sorted events with one fewer
        // allowed attendance.
        let mut prev = vec![0i64; n + 1];
        let rounds = (k as usize).min(n);
        for _ in 0..rounds {
            let mut cur = vec![0i64; n + 1];
            let mut best = 0i64;
            for i in 0..n {
                // Events ending strictly before this start are exactly the
                // first p sorted events (strict: may not start the day
                // another ends).
                let p = ends.partition_point(|&e| e < events[i][0]);
                let take = prev[p] + events[i][2] as i64;
                // The running max carries the skip option forward.
                if take > best {
                    best = take;
                }
                cur[i + 1] = best;
            }
            prev = cur;
        }
        prev[n]
    }
}
