use std::collections::HashSet;

impl Solution {
    pub fn minimum_time_required(jobs: Vec<i32>, k: i32) -> i32 {
        let k = k as usize;
        let mut sorted_jobs = jobs;
        // Biggest jobs first: the largest loads surface at the shallowest
        // levels, where the bound tightens soonest.
        sorted_jobs.sort_unstable_by(|a, b| b.cmp(a));
        let n = sorted_jobs.len();
        // Pessimistic upper bound: everything on one worker.
        let mut best: i64 = sorted_jobs.iter().map(|&j| j as i64).sum();
        let mut loads = vec![0i64; k];
        Self::dfs(0, n, k, &sorted_jobs, &mut loads, &mut best);
        best as i32
    }

    fn dfs(i: usize, n: usize, k: usize, jobs: &[i32], loads: &mut Vec<i64>, best: &mut i64) {
        if i == n {
            // Every complete assignment is legal; keep its max load.
            let mut current: i64 = 0;
            for &l in loads.iter() {
                if l > current {
                    current = l;
                }
            }
            if current < *best {
                *best = current;
            }
            return;
        }
        let mut seen: HashSet<i64> = HashSet::new();
        for w in 0..k {
            // A worker whose current load was already tried for this job
            // leads to an identical subproblem.
            if seen.contains(&loads[w]) {
                continue;
            }
            seen.insert(loads[w]);
            // Bound: this placement can no longer beat best.
            if loads[w] + jobs[i] as i64 >= *best {
                continue;
            }
            loads[w] += jobs[i] as i64;
            Self::dfs(i + 1, n, k, jobs, loads, best);
            loads[w] -= jobs[i] as i64;
            // Empty workers are interchangeable — one trial suffices.
            if loads[w] == 0 {
                break;
            }
        }
    }
}
