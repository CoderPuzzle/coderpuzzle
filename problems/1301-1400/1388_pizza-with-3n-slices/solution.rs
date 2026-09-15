impl Solution {
    pub fn max_size_slices(slices: Vec<i32>) -> i32 {
        let k = slices.len() / 3;

        // dp[i][j] = best value using the first i entries, picking exactly j,
        // with no two chosen adjacent.
        fn rob(arr: &[i32], picks: usize) -> i32 {
            let length = arr.len();
            let mut dp = vec![vec![-1i32; picks + 1]; length + 1];
            dp[0][0] = 0;
            for i in 1..=length {
                for j in 0..=picks {
                    dp[i][j] = dp[i - 1][j];
                    if j >= 1 {
                        let base = if i >= 2 {
                            dp[i - 2][j - 1]
                        } else if j == 1 {
                            0
                        } else {
                            -1
                        };
                        if base >= 0 && base + arr[i - 1] > dp[i][j] {
                            dp[i][j] = base + arr[i - 1];
                        }
                    }
                }
            }
            dp[length][picks]
        }

        if slices.len() == 1 {
            return slices[0];
        }
        let a = rob(&slices[..slices.len() - 1], k);
        let b = rob(&slices[1..], k);
        if a > b {
            a
        } else {
            b
        }
    }
}
