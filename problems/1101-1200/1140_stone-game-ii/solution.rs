impl Solution {
    pub fn stone_game_ii(piles: Vec<i32>) -> i32 {
        let n = piles.len();
        let mut suf = vec![0i32; n + 1];
        for i in (0..n).rev() {
            suf[i] = suf[i + 1] + piles[i];
        }
        // dp[i][m]: max stones the player to move collects from piles[i:]
        // when the current M is m. dp[n][*] = 0.
        let mut dp = vec![vec![0i32; n + 1]; n + 1];
        for i in (0..n).rev() {
            for m in 1..=n {
                let limit = (2 * m).min(n - i);
                let mut best = 0i32;
                for x in 1..=limit {
                    let m2 = m.max(x).min(n);
                    // taking x piles hands over (i + x, max(m, x)); the two
                    // players split the whole suffix, so the mover's haul is
                    // the suffix total minus the opponent's optimal dp
                    let cand = suf[i] - dp[i + x][m2];
                    if cand > best {
                        best = cand;
                    }
                }
                dp[i][m] = best;
            }
        }
        dp[0][1]
    }
}
