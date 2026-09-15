impl Solution {
    pub fn job_scheduling(start_time: Vec<i32>, end_time: Vec<i32>, profit: Vec<i32>) -> i32 {
        let n = start_time.len();
        // Weighted interval scheduling: pack as (end, start, profit) so jobs
        // come out in end-time order and best[i] is final before it is read.
        let mut jobs: Vec<(i32, i32, i32)> = (0..n).map(|i| (end_time[i], start_time[i], profit[i])).collect();
        jobs.sort();
        let ends: Vec<i32> = jobs.iter().map(|j| j.0).collect();

        // bisect_right => a job starting exactly when another ends does not
        // overlap; the hi limit keeps predecessors inside the processed prefix.
        let bisect_right = |target: i32, hi: usize| -> usize {
            let mut lo = 0usize;
            let mut hi = hi;
            while lo < hi {
                let mid = (lo + hi) / 2;
                if ends[mid] <= target {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        };

        // best[i] = max profit using only the first i jobs; best[0] = 0 anchors it.
        let mut best = vec![0i64; n + 1];
        for i in 1..=n {
            let (_, start, p) = jobs[i - 1];
            let j = bisect_right(start, i - 1);
            // Skip job i (inherit best[i-1]) or take it on top of best[j].
            best[i] = best[i - 1].max(best[j] + p as i64);
        }
        best[n] as i32
    }
}
