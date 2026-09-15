impl Solution {
    pub fn earliest_time(tasks: Vec<Vec<i32>>) -> i32 {
        // Tasks never interact: [s, t] finishes at s + t, so the earliest
        // completion is just the smallest such sum.
        let mut best = tasks[0][0] + tasks[0][1];
        for task in &tasks[1..] {
            best = best.min(task[0] + task[1]);
        }
        best
    }
}
