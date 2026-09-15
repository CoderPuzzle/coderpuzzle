impl Solution {
    pub fn min_processing_time(processor_time: Vec<i32>, tasks: Vec<i32>) -> i32 {
        let mut procs = processor_time;
        procs.sort_unstable();
        let mut tasks_desc = tasks;
        tasks_desc.sort_unstable_by(|a, b| b.cmp(a));
        tasks_desc
            .iter()
            .enumerate()
            .map(|(i, task)| procs[i / 4] + task)
            .max()
            .unwrap_or(0)
    }
}
