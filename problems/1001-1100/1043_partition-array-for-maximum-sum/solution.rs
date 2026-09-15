impl Solution {
    pub fn max_sum_after_partitioning(arr: Vec<i32>, k: i32) -> i64 {
        let n = arr.len();
        let mut dp = vec![0i64; n + 1];
        for i in 1..=n {
            let mut best: i64 = 0;
            let mut running_max: i32 = 0;
            let limit = (k as usize).min(i);
            for j in 1..=limit {
                if arr[i - j] > running_max {
                    running_max = arr[i - j];
                }
                let candidate = dp[i - j] + running_max as i64 * j as i64;
                if candidate > best {
                    best = candidate;
                }
            }
            dp[i] = best;
        }
        dp[n]
    }
}
