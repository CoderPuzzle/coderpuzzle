impl Solution {
    pub fn merge_stones(stones: Vec<i32>, k: i32) -> i32 {
        let n = stones.len();
        let k = k as usize;
        // each merge replaces k piles with one (count drops by k - 1), so
        // reaching a single pile requires (k - 1) | (n - 1)
        if (n as i64 - 1) % (k as i64 - 1) != 0 {
            return -1;
        }
        const INF: i64 = 1 << 60;
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + stones[i] as i64;
        }
        // dp[i][j][m] = min cost to compress stones[i..j] into exactly m piles
        let mut dp = vec![vec![vec![INF; k + 1]; n]; n];
        // base: a single stone is already one pile at zero cost
        for i in 0..n {
            dp[i][i][1] = 0;
        }
        // increasing length, so every subinterval is final before it is used
        for length in 2..=n {
            for i in 0..=(n - length) {
                let j = i + length - 1;
                // split: left part squeezed to one pile, right to m - 1;
                // any m-pile configuration has such a first-pile split
                for m in 2..=k {
                    for mid in i..j {
                        if dp[i][mid][1] < INF && dp[mid + 1][j][m - 1] < INF {
                            let cand = dp[i][mid][1] + dp[mid + 1][j][m - 1];
                            if cand < dp[i][j][m] {
                                dp[i][j][m] = cand;
                            }
                        }
                    }
                }
                // at k piles the interval merges into one pile for a cost
                // equal to its total stones (prefix sums answer in O(1))
                if dp[i][j][k] < INF {
                    dp[i][j][1] = dp[i][j][k] + prefix[j + 1] - prefix[i];
                }
            }
        }
        if dp[0][n - 1][1] < INF {
            dp[0][n - 1][1] as i32
        } else {
            -1
        }
    }
}
