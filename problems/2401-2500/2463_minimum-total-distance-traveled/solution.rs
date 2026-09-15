impl Solution {
    pub fn minimum_total_distance(robot: Vec<i32>, factory: Vec<Vec<i32>>) -> i64 {
        let mut rob = robot.clone();
        rob.sort();
        let mut facs: Vec<(i32, i32)> = factory.iter().map(|f| (f[0], f[1])).collect();
        facs.sort();
        // Optimal plans are non-crossing (triangle inequality), so after
        // sorting, each factory serves a contiguous block of robots in order.
        let n = rob.len();
        let inf = i64::MAX / 4;
        // dp[i] = min distance to repair the first i robots with the
        // factories processed so far; only i = 0 is reachable initially.
        let mut dp = vec![inf; n + 1];
        dp[0] = 0;
        for &(pos32, limit) in &facs {
            let pos = pos32 as i64;
            // pref[i] = sum of |robot[j] - pos| for j < i: prefix differences
            // give any contiguous block's distance to this factory.
            let mut pref = vec![0i64; n + 1];
            for i in 0..n {
                pref[i + 1] = pref[i] + (rob[i] as i64 - pos).abs();
            }
            let mut ndp = dp.clone();
            for i in 1..=n {
                // dp[i] carried over = skip this factory (zero assignments).
                let mut best = dp[i];
                // This factory absorbs the trailing t robots i-t..i-1.
                let max_t = (limit as usize).min(i);
                for t in 1..=max_t {
                    if dp[i - t] == inf {
                        continue;
                    }
                    let val = dp[i - t] + pref[i] - pref[i - t];
                    if val < best {
                        best = val;
                    }
                }
                ndp[i] = best;
            }
            dp = ndp;
        }
        dp[n]
    }
}
