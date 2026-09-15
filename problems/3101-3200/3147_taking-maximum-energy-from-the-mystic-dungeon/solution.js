/**
 * @param {number[]} energy
 * @param {number} k
 * @return {number}
 */
var maximumEnergy = function (energy, k) {
    // The curse forces each start's journey: magician i jumps to
    // i + k, then i + 2k, and so on until the line ends. So dp[i],
    // the total gained when starting at i, obeys
    // dp[i] = dp[i + k] + energy[i]: one backward pass fills every
    // chain as a running suffix sum, and the answer is the largest
    // entry. Every journey holds at most n cells of magnitude up to
    // 1000, so |dp[i]| <= 10⁵ * 10³ = 10⁸ — far below 2^53 — so Number
    // stays exact, and the wire type is 64-bit.
    const n = energy.length;
    const dp = new Array(n).fill(0);
    dp[n - 1] = energy[n - 1];
    let best = dp[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        const nxt = i + k < n ? dp[i + k] : 0;
        dp[i] = energy[i] + nxt;
        if (dp[i] > best) {
            best = dp[i];
        }
    }
    return best;
};
