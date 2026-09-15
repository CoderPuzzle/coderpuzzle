impl Solution {
    pub fn min_travel_time(l: i32, n: i32, k: i32, position: Vec<i32>, time: Vec<i32>) -> i32 {
        let n = n as usize;
        let k = k as usize;
        const INF: i64 = 1_i64 << 60;
        // prefix[t] = sum of time[0..t-1]; merging a run of s removals that
        // sit directly before kept sign i folds time[i-s..i] into its rate.
        // Answers stay <= l * sum(time) <= 1e7, but widen to i64.
        let mut prefix = vec![0_i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + time[i] as i64;
        }
        // dp[i][j][s]: sign i kept, j merges spent, s consecutive removals
        // directly before i; the outgoing segment (i -> next kept) is
        // charged when the transition is relaxed.
        let mut dp = vec![vec![vec![INF; k + 1]; k + 1]; n];
        dp[0][0][0] = 0;
        for i in 0..n {
            for j in 0..=k {
                for s in 0..=k {
                    let base = dp[i][j][s];
                    if base == INF {
                        continue;
                    }
                    let rate = prefix[i + 1] - prefix[i - s];
                    for q in i + 1..n {
                        let d = q - i - 1;
                        if j + d > k {
                            break;
                        }
                        let cost = base + (position[q] - position[i]) as i64 * rate;
                        if cost < dp[q][j + d][d] {
                            dp[q][j + d][d] = cost;
                        }
                    }
                }
            }
        }
        (0..=k).map(|s| dp[n - 1][k][s]).min().unwrap() as i32
    }
}
