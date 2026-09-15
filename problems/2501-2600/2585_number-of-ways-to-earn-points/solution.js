/**
 * @param {number} target
 * @param {number[][]} types
 * @return {number}
 */
var waysToReachTarget = function (target, types) {
    // Bounded knapsack over score: dp[p] counts ways to hit exactly p
    // points with the types processed so far; each type opens a fresh
    // row so indistinguishable questions only contribute take-counts.
    const MOD = 1e9 + 7;
    let dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (const [count, marks] of types) {
        const nxt = new Array(target + 1).fill(0);
        for (let points = 0; points <= target; ++points) {
            const maxTake = Math.min(count, Math.floor(points / marks));
            // <= 51 residues < 10^9+7 sum to < 5.5e10 << 2^53, so
            // Number addition stays exact before the single reduction.
            let total = 0;
            for (let taken = 0; taken <= maxTake; ++taken) {
                total += dp[points - taken * marks];
            }
            nxt[points] = total % MOD;
        }
        dp = nxt;
    }
    return dp[target];
};
