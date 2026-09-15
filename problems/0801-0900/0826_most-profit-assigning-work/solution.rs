impl Solution {
    pub fn max_profit_assignment(difficulty: Vec<i32>, profit: Vec<i32>, worker: Vec<i32>) -> i32 {
        // Workers never compete: jobs are reusable, so each worker simply
        // earns the maximum profit among the jobs whose difficulty is at
        // most their ability. Sort the jobs by difficulty, carry the running
        // profit maximum, and read every worker's earning off a binary
        // search into the sorted difficulties.
        let mut jobs: Vec<(i32, i32)> = difficulty.into_iter().zip(profit).collect();
        jobs.sort_unstable();
        let hardest: Vec<i32> = jobs.iter().map(|&(difficulty, _)| difficulty).collect();
        let mut best: Vec<i32> = Vec::with_capacity(jobs.len());
        let mut top = 0;
        for &(_, p) in &jobs {
            top = top.max(p);
            best.push(top);
        }
        let mut total: i64 = 0;
        for &ability in &worker {
            let count = hardest.partition_point(|&difficulty| difficulty <= ability);
            if count > 0 {
                total += best[count - 1] as i64;
            }
        }
        total as i32
    }
}
