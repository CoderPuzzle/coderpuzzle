impl Solution {
    pub fn bag_of_tokens_score(tokens: Vec<i32>, power: i32) -> i32 {
        // An optimal plan buys points with the cheapest tokens and sells the
        // dearest ones for power, so sort and walk two pointers inward.
        let mut tokens = tokens;
        let mut power = power;
        tokens.sort();
        let mut left: isize = 0;
        let mut right: isize = tokens.len() as isize - 1;
        let mut score = 0;
        let mut best = 0;
        while left <= right {
            if power >= tokens[left as usize] {
                // Affordable: buy a point with the cheapest remaining token.
                power -= tokens[left as usize];
                score += 1;
                left += 1;
                best = best.max(score);
            } else if score >= 1 && left < right {
                // Broke: sell a point for the power of the dearest token,
                // keeping one token in play to spend it on.
                power += tokens[right as usize];
                score -= 1;
                right -= 1;
            } else {
                break;
            }
        }
        best
    }
}
