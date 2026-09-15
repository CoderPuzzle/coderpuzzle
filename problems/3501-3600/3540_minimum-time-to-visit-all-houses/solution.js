/**
 * @param {number[]} forward
 * @param {number[]} backward
 * @param {number[]} queries
 * @return {number}
 */
var minTotalTime = function (forward, backward, queries) {
    // Prefix sums over both road sets. Forward distance a -> b walks
    // forward[a..], backward distance a -> b walks backward[a],
    // backward[a-1], ..., i.e. the descending edge weights. Each move takes
    // the cheaper of the two directions. Totals reach 1e5 moves x 1e10
    // meters = 1e15 < 2^53, so Number arithmetic stays exact.
    const n = forward.length;
    const f = new Array(n + 1).fill(0);
    const b = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        f[i + 1] = f[i] + forward[i];
        b[i + 1] = b[i] + backward[i];
    }
    const tf = f[n];
    const tb = b[n];
    let ans = 0;
    let prev = 0;
    for (const q of queries) {
        const fwd = prev < q ? f[q] - f[prev] : tf - f[prev] + f[q];
        // spends backward[prev], backward[prev-1], ..., backward[q+1]
        const bwd = prev > q ? b[prev + 1] - b[q + 1] : b[prev + 1] + tb - b[q + 1];
        ans += Math.min(fwd, bwd);
        prev = q;
    }
    return ans;
};
