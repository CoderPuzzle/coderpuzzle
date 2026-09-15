/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} stayScore
 * @param {number[][]} travelScore
 * @return {number}
 */
var maxScore = function (n, k, stayScore, travelScore) {
    // dp[j] is the best score after the processed days with the tourist
    // in city j; every city starts at 0, which encodes the free choice
    // of the starting city. Each day, city j is either stayed in
    // (dp[j] + stayScore[i][j]) or reached by a move c -> j
    // (dp[c] + travelScore[c][j]). The c == j term is a 0-point no-op
    // (travelScore[i][i] == 0); keeping it inside the max is harmless,
    // since replacing a no-op day with a stay never lowers the score.
    const dp = new Array(n).fill(0);
    for (let i = 0; i < k; i += 1) {
        const reached = new Array(n);
        for (let j = 0; j < n; j += 1) {
            let best = dp[j] + stayScore[i][j];
            for (let c = 0; c < n; c += 1) {
                const moved = dp[c] + travelScore[c][j];
                if (moved > best) best = moved;
            }
            reached[j] = best;
        }
        for (let j = 0; j < n; j += 1) dp[j] = reached[j];
    }
    let answer = dp[0];
    for (let j = 1; j < n; j += 1) {
        if (dp[j] > answer) answer = dp[j];
    }
    return answer;
};
