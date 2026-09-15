impl Solution {
    pub fn stone_game(piles: Vec<i32>) -> bool {
        let n = piles.len();
        // dp[i][j] = the best final score difference (mover minus opponent)
        // over piles[i..j]: taking an end scores it and hands the rest
        // over, so the opponent's best difference on the shorter row
        // counts against the taker.
        let mut dp = vec![vec![0i32; n]; n];
        for i in 0..n {
            dp[i][i] = piles[i];
        }
        for length in 2..=n {
            for i in 0..n - length + 1 {
                let j = i + length - 1;
                dp[i][j] = (piles[i] - dp[i + 1][j]).max(piles[j] - dp[i][j - 1]);
            }
        }
        dp[0][n - 1] > 0
    }
}
