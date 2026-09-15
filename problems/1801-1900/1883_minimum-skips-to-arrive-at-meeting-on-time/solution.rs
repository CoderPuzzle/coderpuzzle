impl Solution {
    // dp[j] = smallest accumulated time (in distance units) after the
    // current road with j skips used; rests already rounded. Rest:
    // ceil((t+d)/speed)*speed at same j; skip: t+d at j+1.
    pub fn min_skips(dist: Vec<i32>, speed: i32, hours_before: i32) -> i32 {
        let n = dist.len();
        const INF: i64 = 1i64 << 60;
        let mut dp = vec![INF; n + 1];
        dp[0] = 0;
        for (i, &di) in dist.iter().enumerate() {
            let d = di as i64;
            let mut ndp = vec![INF; n + 1];
            if i == n - 1 {
                for j in 0..=n {
                    if dp[j] < INF && dp[j] + d < ndp[j] {
                        ndp[j] = dp[j] + d;
                    }
                }
            } else {
                for j in 0..n {
                    let t = dp[j];
                    if t >= INF {
                        continue;
                    }
                    let arr = t + d;
                    if arr < ndp[j + 1] {
                        ndp[j + 1] = arr;
                    }
                    let rested = (arr + speed as i64 - 1) / speed as i64 * speed as i64;
                    if rested < ndp[j] {
                        ndp[j] = rested;
                    }
                }
            }
            dp = ndp;
        }
        let limit = hours_before as i64 * speed as i64;
        for j in 0..=n {
            if dp[j] < INF && dp[j] <= limit {
                return j as i32;
            }
        }
        -1
    }
}
