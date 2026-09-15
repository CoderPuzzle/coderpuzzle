/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function (stoneValue) {
    const n = stoneValue.length;
    // dp[i] = best (current player's score - opponent's score) on the
    // suffix starting at i; dp[n] = 0 is the empty-row base.
    const dp = new Array(n + 1).fill(0);
    // Backwards fill so dp[j+1] is already known whenever dp[i] reads it.
    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        let best = -Infinity;
        // Try taking 1-3 piles; the clamp handles short rows. Taking
        // piles i..j earns `take`, then the opponent plays optimally and
        // wins dp[j+1] over us, so the net is take - dp[j+1].
        for (let j = i; j < Math.min(i + 3, n); j++) {
            take += stoneValue[j];
            const cand = take - dp[j + 1];
            if (cand > best) {
                best = cand;
            }
        }
        dp[i] = best;
    }
    // Alice moves first: dp[0] is her optimal margin over Bob.
    if (dp[0] > 0) {
        return "Alice";
    }
    if (dp[0] < 0) {
        return "Bob";
    }
    return "Tie";
};
