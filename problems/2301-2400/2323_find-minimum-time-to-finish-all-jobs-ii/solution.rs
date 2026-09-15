impl Solution {
    // Pair the k-th smallest job with the k-th smallest worker. Exchange
    // argument: ceil(j / w) never decreases when j grows and never grows
    // when w does, so if a smaller job held the larger of two capacities
    // while a larger job held the smaller one, swapping them leaves both
    // pairs' day counts no higher and every other pair untouched. Each
    // swap removes an inversion between the sorted orders, so uncrossing
    // ends at this rank-by-rank pairing — its maximum is the optimum.
    pub fn minimum_time(jobs: Vec<i32>, workers: Vec<i32>) -> i32 {
        let mut jobs = jobs;
        let mut workers = workers;
        jobs.sort_unstable();
        workers.sort_unstable();
        let mut best = 0_i32;
        for i in 0..jobs.len() {
            let days = (jobs[i] + workers[i] - 1) / workers[i];
            best = best.max(days);
        }
        best
    }
}
