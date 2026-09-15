/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
    const n = piles.length;
    const suf = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        suf[i] = suf[i + 1] + piles[i];
    }
    // dp[i][m]: max stones the player to move collects from piles[i:]
    // when the current M is m. dp[n][*] = 0.
    const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let m = 1; m <= n; m++) {
            const limit = Math.min(2 * m, n - i);
            let best = 0;
            for (let x = 1; x <= limit; x++) {
                const m2 = Math.min(Math.max(m, x), n);
                // taking x piles hands over (i + x, max(m, x)); the two
                // players split the whole suffix, so the mover's haul is
                // the suffix total minus the opponent's optimal dp
                const cand = suf[i] - dp[i + x][m2];
                if (cand > best) {
                    best = cand;
                }
            }
            dp[i][m] = best;
        }
    }
    return dp[0][1];
};
