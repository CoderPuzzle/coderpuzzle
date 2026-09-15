// dp[j] is the best score after the processed days with the tourist in
// city j; every city starts at 0, which encodes the free choice of the
// starting city. Each day, city j is either stayed in
// (dp[j] + stayScore[i][j]) or reached by a move c -> j
// (dp[c] + travelScore[c][j]). The c == j term is a 0-point no-op
// (travelScore[i][i] == 0); keeping it inside the max is harmless, since
// replacing a no-op day with a stay never lowers the score.
impl Solution {
    pub fn max_score(n: i32, k: i32, stayScore: Vec<Vec<i32>>, travelScore: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut dp = vec![0; n];
        for i in 0..k as usize {
            let mut reached = vec![0; n];
            for j in 0..n {
                let mut best = dp[j] + stayScore[i][j];
                for c in 0..n {
                    best = best.max(dp[c] + travelScore[c][j]);
                }
                reached[j] = best;
            }
            dp = reached;
        }
        let mut answer = dp[0];
        for &value in &dp {
            answer = answer.max(value);
        }
        answer
    }
}
