function bagOfTokensScore(tokens: number[], power: number): number {
    // An optimal plan buys points with the cheapest tokens and sells the
    // dearest ones for power, so sort and walk two pointers inward.
    tokens.sort((a, b) => a - b);
    let left = 0;
    let right = tokens.length - 1;
    let score = 0;
    let best = 0;
    while (left <= right) {
        if (power >= tokens[left]) {
            // Affordable: buy a point with the cheapest remaining token.
            power -= tokens[left];
            score++;
            left++;
            best = Math.max(best, score);
        } else if (score >= 1 && left < right) {
            // Broke: sell a point for the power of the dearest token,
            // keeping one token in play to spend it on.
            power += tokens[right];
            score--;
            right--;
        } else {
            break;
        }
    }
    return best;
}
