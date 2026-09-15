impl Solution {
    pub fn find_minimum_time(tasks: Vec<Vec<i32>>) -> i32 {
        // Run each task as late as its window allows: seconds committed at
        // the end of the timeline are inside more upcoming (by end time)
        // windows, so this never steals a second an earlier task needed.
        let mut tasks = tasks;
        tasks.sort_unstable_by_key(|task| task[1]);
        let mut running = vec![false; 2001];
        let mut total = 0;
        for task in &tasks {
            let (start, end) = (task[0] as usize, task[1] as usize);
            // Reuse whatever is already on inside this window...
            let mut need = task[2];
            for t in start..=end {
                if running[t] {
                    need -= 1;
                }
            }
            // ...then book the remainder at the latest free points.
            let mut t = end;
            while need > 0 {
                if !running[t] {
                    running[t] = true;
                    total += 1;
                    need -= 1;
                }
                t -= 1;
            }
        }
        total
    }
}
