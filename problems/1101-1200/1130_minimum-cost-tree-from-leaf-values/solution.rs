impl Solution {
    pub fn mct_from_leaf_values(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        // dp[i][j] = min sum of non-leaf nodes for subarray arr[i..j]
        let mut dp = vec![vec![0i32; n]; n];
        // maxi[i][j] = max leaf value in arr[i..j]
        let mut maxi = vec![vec![0i32; n]; n];
        for i in 0..n {
            maxi[i][i] = arr[i];
        }
        for length in 2..=n {
            for i in 0..n + 1 - length {
                let j = i + length - 1;
                maxi[i][j] = maxi[i][j - 1].max(arr[j]);
            }
        }
        for length in 2..=n {
            for i in 0..n + 1 - length {
                let j = i + length - 1;
                let mut best = i32::MAX;
                for k in i..j {
                    let cost = maxi[i][k] * maxi[k + 1][j] + dp[i][k] + dp[k + 1][j];
                    if cost < best {
                        best = cost;
                    }
                }
                dp[i][j] = best;
            }
        }
        dp[0][n - 1]
    }
}
