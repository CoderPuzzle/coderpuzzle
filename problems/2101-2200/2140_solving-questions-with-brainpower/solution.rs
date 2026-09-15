impl Solution {
    pub fn most_points(questions: Vec<Vec<i32>>) -> i64 {
        let n = questions.len();
        // dp[i] = best score starting at question i; dp[n] = 0 is the
        // sentinel for "nothing left". Fill right to left so every future
        // value is ready before it is read.
        let mut dp = vec![0i64; n + 1];
        for i in (0..n).rev() {
            let points = questions[i][0] as i64;
            // nxt is the first question unlocked after the lockout; a jump
            // past the end contributes nothing.
            let nxt = i + questions[i][1] as usize + 1;
            let take = points + if nxt <= n { dp[nxt] } else { 0 };
            // Skip keeps dp[i+1]; take solves and jumps.
            dp[i] = dp[i + 1].max(take);
        }
        dp[0]
    }
}
