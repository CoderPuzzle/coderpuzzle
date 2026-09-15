/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
    const MOD = 1000000007;
    // dp[t]: ways for the dice processed so far to show sum t
    let dp = new Array(target + 1).fill(0);
    // zero dice reach sum 0 in exactly one way
    dp[0] = 1;
    for (let d = 0; d < n; d++) {
        // fresh table per die: the transition must read only the previous
        // die's distribution, else one die could count twice
        const ndp = new Array(target + 1).fill(0);
        for (let t = 1; t <= target; t++) {
            let s = 0;
            // every face value f is a distinct outcome, so all faces are
            // summed; min(k, t) skips faces that overshoot the target
            const hi = Math.min(k, t);
            for (let f = 1; f <= hi; f++) {
                s += dp[t - f];
            }
            ndp[t] = s % MOD;
        }
        dp = ndp;
    }
    // targets no die sequence reaches were never written, so read as 0
    return dp[target];
};
