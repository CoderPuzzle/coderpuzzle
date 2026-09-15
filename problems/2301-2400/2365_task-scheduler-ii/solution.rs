use std::collections::HashMap;

impl Solution {
    // Greedily complete each task on the earliest legal day: breaks only
    // ever help by making a later same-type task legal sooner. Jump the
    // clock to last[type] + space + 1 when the next task is still blocked;
    // totals reach ~1e10, so run in 64 bits.
    pub fn task_scheduler_ii(tasks: Vec<i32>, space: i32) -> i64 {
        let mut last_day: HashMap<i32, i64> = HashMap::new();
        let mut day: i64 = 0;
        for task in tasks {
            let next = match last_day.get(&task) {
                Some(&last) => (day + 1).max(last + space as i64 + 1),
                None => day + 1,
            };
            day = next;
            last_day.insert(task, day);
        }
        day
    }
}
