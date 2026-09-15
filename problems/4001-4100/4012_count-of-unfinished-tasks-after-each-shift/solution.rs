impl Solution {
    pub fn count_tasks(tasks: Vec<i32>, shifts: Vec<i32>) -> Vec<i32> {
        let n = tasks.len();
        let mut pref: Vec<i64> = Vec::with_capacity(n);
        let mut acc: i64 = 0;
        for &t in &tasks {
            acc += t as i64;
            pref.push(acc);
        }
        let total = acc;
        let mut done: i64 = 0;
        let mut out = Vec::with_capacity(shifts.len());
        for &s in &shifts {
            // done is the cumulative work finished within the current pass;
            // reaching the total ends the pass and discards unused time.
            done += s as i64;
            if done >= total {
                out.push(0);
                done = 0;
                continue;
            }
            // partition_point finds the first prefix above done, so boundary
            // landings count as complete: pref[i] <= done means task i is
            // fully finished, and the next task holds all partial work.
            let c = pref.partition_point(|&p| p <= done);
            out.push((n - c) as i32);
        }
        out
    }
}
