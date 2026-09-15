impl Solution {
    pub fn max_coins(nums: Vec<i32>) -> i32 {
        // Pad with virtual 1s so bursts at the boundary need no special casing.
        let m = nums.len() + 2;
        let mut padded = vec![1i64; m];
        for (i, &v) in nums.iter().enumerate() {
            padded[i + 1] = v as i64;
        }
        let mut dp = vec![vec![0i64; m]; m];
        // Fill by increasing interval length so both subintervals of a cell
        // are already solved when it is needed.
        for length in 1..m - 1 {
            for left in 1..m - length {
                let right = left + length - 1;
                // Try each k as the LAST burst in the open interval (left, right):
                // at that moment its neighbors are the fixed boundaries.
                for k in left..=right {
                    let coins = padded[left - 1] * padded[k] * padded[right + 1] + dp[left][k - 1] + dp[k + 1][right];
                    if coins > dp[left][right] {
                        dp[left][right] = coins;
                    }
                }
            }
        }
        // Everything strictly between the two padding 1s.
        dp[1][m - 2] as i32
    }
}
