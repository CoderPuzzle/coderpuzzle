impl Solution {
    pub fn hardest_worker(n: i32, logs: Vec<Vec<i32>>) -> i32 {
        // The ith task runs from the previous leave time to logs[i][1] (task
        // 0 starts at 0). Keep the best (longest, then smallest id) running.
        let mut best_id = -1;
        let mut best_time = -1;
        let mut prev = 0;
        for log in &logs {
            let duration = log[1] - prev;
            if duration > best_time || (duration == best_time && log[0] < best_id) {
                best_time = duration;
                best_id = log[0];
            }
            prev = log[1];
        }
        best_id
    }
}
