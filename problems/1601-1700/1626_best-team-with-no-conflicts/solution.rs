impl Solution {
    pub fn best_team_score(scores: Vec<i32>, ages: Vec<i32>) -> i32 {
        let n = scores.len();
        let mut order: Vec<usize> = (0..n).collect();
        // Sort player indices by age, breaking ties by score, so any
        // conflict-free team becomes a non-decreasing run of scores.
        order.sort_by(|&a, &b| (ages[a], scores[a]).cmp(&(ages[b], scores[b])));

        let sorted_scores: Vec<i32> = order.iter().map(|&i| scores[i]).collect();

        // dp[i] = best total for a team ending at player i (in sorted order).
        let mut dp = vec![0i32; n];
        let mut best = 0;
        for i in 0..n {
            dp[i] = sorted_scores[i];
            for j in 0..i {
                if sorted_scores[j] <= sorted_scores[i] {
                    dp[i] = dp[i].max(dp[j] + sorted_scores[i]);
                }
            }
            best = best.max(dp[i]);
        }
        best
    }
}
