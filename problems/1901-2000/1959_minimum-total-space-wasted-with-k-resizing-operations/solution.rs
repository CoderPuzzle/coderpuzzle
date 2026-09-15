impl Solution {
    pub fn min_space_wasted_k_resizing(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        // g[i][j] = waste if a single allocation covers nums[i..j]
        let mut g = vec![vec![0i64; n]; n];
        for i in 0..n {
            let mut mx: i64 = 0;
            for j in i..n {
                if nums[j] as i64 > mx {
                    mx = nums[j] as i64;
                }
                g[i][j] = mx * (j - i + 1) as i64 - (prefix[j + 1] - prefix[i]);
            }
        }
        const INF: i64 = 1i64 << 60;
        // dp[j][i] = min waste for suffix starting at i using j segments
        let kk = k as usize;
        let mut dp = vec![vec![INF; n + 1]; kk + 2];
        dp[0][n] = 0;
        for j in 1..kk + 2 {
            for i in (0..n).rev() {
                let mut best = INF;
                for t in i..n {
                    if dp[j - 1][t + 1] < INF {
                        let cand = g[i][t] + dp[j - 1][t + 1];
                        if cand < best {
                            best = cand;
                        }
                    }
                }
                dp[j][i] = best;
            }
        }
        dp[kk + 1][0] as i32
    }
}
