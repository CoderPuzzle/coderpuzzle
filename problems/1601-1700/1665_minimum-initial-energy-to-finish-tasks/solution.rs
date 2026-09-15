impl Solution {
    pub fn minimum_effort(mut tasks: Vec<Vec<i32>>) -> i64 {
        // Order by slack (minimum - actual) descending: a high-slack task
        // done early banks its surplus while the budget is still high —
        // exchange arguments show an adjacent inversion never helps.
        tasks.sort_by(|a, b| (b[1] - b[0]).cmp(&(a[1] - a[0])));
        let mut spent: i64 = 0;
        let mut answer: i64 = 0;
        for task in &tasks {
            // Each task needs current energy >= its minimum, so the answer
            // is the largest prefix requirement; only `actual` is consumed.
            answer = answer.max(spent + task[1] as i64);
            spent += task[0] as i64;
        }
        answer
    }
}
