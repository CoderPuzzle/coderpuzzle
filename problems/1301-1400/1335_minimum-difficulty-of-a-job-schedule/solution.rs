impl Solution {
    pub fn min_difficulty(job_difficulty: Vec<i32>, d: i32) -> i32 {
        let n = job_difficulty.len();
        let d = d as usize;
        if n < d {
            return -1;
        }
        let inf = i32::MAX / 2;
        let mut dp = vec![vec![inf; n + 1]; d + 1];
        dp[0][0] = 0;
        for j in 1..=d {
            for i in j..=n {
                let mut day_max = 0;
                let mut best = inf;
                let mut k = i;
                while k >= j {
                    day_max = day_max.max(job_difficulty[k - 1]);
                    let prev = dp[j - 1][k - 1];
                    if prev != inf && prev + day_max < best {
                        best = prev + day_max;
                    }
                    k -= 1;
                }
                dp[j][i] = best;
            }
        }
        dp[d][n]
    }
}
