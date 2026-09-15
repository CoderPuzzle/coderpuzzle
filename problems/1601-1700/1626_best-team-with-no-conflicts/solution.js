/**
 * @param {number[]} scores
 * @param {number[]} ages
 * @return {number}
 */
var bestTeamScore = function (scores, ages) {
    const n = scores.length;
    const order = Array.from({ length: n }, (_, i) => i);
    // Sort player indices by age, breaking ties by score, so any
    // conflict-free team becomes a non-decreasing run of scores.
    order.sort((a, b) => (ages[a] !== ages[b] ? ages[a] - ages[b] : scores[a] - scores[b]));

    const sortedScores = order.map((i) => scores[i]);

    // dp[i] = best total for a team ending at player i (in sorted order).
    const dp = new Array(n).fill(0);
    let best = 0;
    for (let i = 0; i < n; i++) {
        dp[i] = sortedScores[i];
        for (let j = 0; j < i; j++) {
            if (sortedScores[j] <= sortedScores[i]) {
                dp[i] = Math.max(dp[i], dp[j] + sortedScores[i]);
            }
        }
        best = Math.max(best, dp[i]);
    }
    return best;
};
