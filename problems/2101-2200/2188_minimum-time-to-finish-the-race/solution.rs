impl Solution {
    pub fn minimum_finish_time(tires: Vec<Vec<i32>>, change_time: i32, num_laps: i32) -> i64 {
        // Precompute best[x]: the cheapest time for x consecutive laps on
        // a single tire. A run never helps once its next lap costs more
        // than resetting to the fastest first lap; ratios are >= 2 so the
        // useful run length is tiny.
        const INF: i64 = 1i64 << 62;
        let n = num_laps as usize;
        let fastest_first = tires.iter().map(|t| t[0]).min().unwrap() as i64;
        let mut best = vec![INF; n + 1];
        for tire in &tires {
            let fi = tire[0] as i64;
            let ri = tire[1] as i64;
            let mut total = 0i64;
            let mut lap = fi;
            for x in 1..=n {
                total += lap;
                if total < best[x] {
                    best[x] = total;
                }
                if lap >= change_time as i64 + fastest_first || total > INF / ri {
                    break;
                }
                lap *= ri;
            }
        }
        let mut dp = vec![INF; n + 1];
        dp[0] = 0;
        for i in 1..=n {
            for x in 1..=i {
                if best[x] == INF {
                    continue;
                }
                let mut candidate = dp[i - x] + best[x];
                if i != x {
                    candidate += change_time as i64;
                }
                if candidate < dp[i] {
                    dp[i] = candidate;
                }
            }
        }
        dp[n]
    }
}
