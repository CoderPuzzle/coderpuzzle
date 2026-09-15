impl Solution {
    pub fn minimum_moves(arr: Vec<i32>) -> i32 {
        let n = arr.len();
        if n == 0 {
            return 0;
        }

        // dp[i][j] = min moves to erase arr[i..j]; removals concatenate the
        // surviving parts, so the cost depends only on the subarray's contents.
        let mut dp = vec![vec![0i32; n]; n];
        for i in 0..n {
            dp[i][i] = 1;
        }
        for i in 0..n.saturating_sub(1) {
            dp[i][i + 1] = if arr[i] == arr[i + 1] { 1 } else { 2 };
        }

        // Fill by increasing length so every referenced subinterval is final.
        for length in 3..=n {
            for i in 0..=(n - length) {
                let j = i + length - 1;
                // Upper bound: shed the first element in some move.
                let mut best = 1 + dp[i + 1][j];
                // Split: the two halves can be cleared independently —
                // removals never mix across a boundary both sides respect.
                for k in i..j {
                    let candidate = dp[i][k] + dp[k + 1][j];
                    if candidate < best {
                        best = candidate;
                    }
                }
                // Equal ends may share one move deferred to the last turn:
                // clear the interior first, then remove the pair together.
                // Peeling a matched pair never breaks palindromes, so it
                // costs nothing extra.
                if arr[i] == arr[j] && dp[i + 1][j - 1] < best {
                    best = dp[i + 1][j - 1];
                }
                dp[i][j] = best;
            }
        }
        dp[0][n - 1]
    }
}
