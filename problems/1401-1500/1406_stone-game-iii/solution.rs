impl Solution {
    pub fn stone_game_iii(stone_value: Vec<i32>) -> String {
        let n = stone_value.len();
        // dp[i] = best (current player's score - opponent's score) on the
        // suffix starting at i; dp[n] = 0 is the empty-row base.
        let mut dp = vec![0i64; n + 1];
        // Backwards fill so dp[j+1] is already known whenever dp[i] reads it.
        for i in (0..n).rev() {
            let mut take: i64 = 0;
            let mut best: i64 = i64::MIN;
            // Try taking 1-3 piles; the clamp handles short rows. Taking
            // piles i..j earns `take`, then the opponent plays optimally and
            // wins dp[j+1] over us, so the net is take - dp[j+1].
            let hi = (i + 3).min(n);
            for j in i..hi {
                take += stone_value[j] as i64;
                let cand = take - dp[j + 1];
                if cand > best {
                    best = cand;
                }
            }
            dp[i] = best;
        }
        // Alice moves first: dp[0] is her optimal margin over Bob.
        if dp[0] > 0 {
            "Alice".to_string()
        } else if dp[0] < 0 {
            "Bob".to_string()
        } else {
            "Tie".to_string()
        }
    }
}
