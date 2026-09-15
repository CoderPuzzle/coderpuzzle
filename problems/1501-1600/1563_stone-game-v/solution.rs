impl Solution {
    pub fn stone_game_v(stone_value: Vec<i32>) -> i64 {
        let n = stone_value.len();
        // Prefix sums turn any slice's weight into an O(1) subtraction.
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + stone_value[i] as i64;
        }

        // dp[i][j] is the best score obtainable starting from the slice
        // [i, j]; a single stone (i == j) ends the game with no more score,
        // so the table is left at its zero-initialized default there.
        let mut dp = vec![vec![0i64; n]; n];
        for length in 2..=n {
            for i in 0..=(n - length) {
                let j = i + length - 1;
                let mut best = 0i64;
                for k in i..j {
                    let left_sum = prefix[k + 1] - prefix[i];
                    let right_sum = prefix[j + 1] - prefix[k + 1];
                    let candidate = if left_sum < right_sum {
                        left_sum + dp[i][k]
                    } else if left_sum > right_sum {
                        right_sum + dp[k + 1][j]
                    } else {
                        // A tie lets Alice keep whichever half scores more later.
                        left_sum + dp[i][k].max(dp[k + 1][j])
                    };
                    if candidate > best {
                        best = candidate;
                    }
                }
                dp[i][j] = best;
            }
        }
        dp[0][n - 1]
    }
}
