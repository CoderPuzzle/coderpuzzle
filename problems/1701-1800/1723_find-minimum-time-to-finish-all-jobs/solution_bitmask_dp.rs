impl Solution {
    pub fn minimum_time_required(jobs: Vec<i32>, k: i32) -> i32 {
        let k = k as usize;
        let n = jobs.len();
        let size = 1usize << n;
        let full = size - 1;
        // sums[mask]: total length of the job set named by mask, built by
        // peeling off one lowest-numbered job at a time.
        let mut sums = vec![0i64; size];
        for mask in 1..size {
            let low = mask & mask.wrapping_neg();
            sums[mask] = sums[mask ^ low] + jobs[low.trailing_zeros() as usize] as i64;
        }
        let total = sums[full];
        // prev[mask]: lightest maximum load achievable when the job set mask
        // is covered by the workers placed so far. One worker is placed, so
        // every set simply lands on it whole.
        let mut prev = sums.clone();
        for _worker in 2..=k {
            let mut cur = vec![0i64; size];
            for mask in 1..size {
                let low = mask & mask.wrapping_neg();
                let rest = mask ^ low;
                // The worker being placed must take the lowest-numbered job
                // still unserved — workers are interchangeable — so only
                // submasks holding that bit are distinct choices.
                let mut best = total;
                let mut sub = rest;
                loop {
                    // The newcomer carries sub; everything else was already
                    // solved on one fewer worker. The worse side of the pair
                    // is the finished assignment's maximum load.
                    let mut carried = prev[rest ^ sub];
                    let load = sums[sub | low];
                    if carried < load {
                        carried = load;
                    }
                    if carried < best {
                        best = carried;
                    }
                    if sub == 0 {
                        break;
                    }
                    sub = (sub - 1) & rest;
                }
                cur[mask] = best;
            }
            prev = cur;
        }
        prev[full] as i32
    }
}
