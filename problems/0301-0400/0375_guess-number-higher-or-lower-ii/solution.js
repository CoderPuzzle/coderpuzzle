/**
 * @param {number} n
 * @return {number}
 */
var getMoneyAmount = function (n) {
    // dp[i][j] = min money that guarantees finding any number in
    // [i, j]; padded to n+2 so the empty-side reads below stay valid (0).
    const size = n + 2;
    const dp = new Array(size);
    for (let i = 0; i < size; i++) dp[i] = new Array(size).fill(0);
    // Fill by interval length: a range's value depends only on its
    // strictly shorter subranges. Length 1 is free (single candidate).
    for (let length = 2; length <= n; length++) {
        for (let i = 1; i <= n - length + 1; i++) {
            const j = i + length - 1;
            let best = Infinity;
            // Minimax: the opponent may hide in the worse side, so
            // guessing g costs g + max(dp of the two remaining sides).
            for (let guess = i; guess <= j; guess++) {
                const cost = guess + Math.max(dp[i][guess - 1], dp[guess + 1][j]);
                if (cost < best) best = cost;
            }
            dp[i][j] = best;
        }
    }
    return dp[1][n];
};
