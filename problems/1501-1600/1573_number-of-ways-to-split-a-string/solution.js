/**
 * @param {string} s
 * @return {number}
 */
var numWays = function (s) {
    // A split into three equal-ones parts only exists when the total
    // number of '1's is a multiple of 3. With `total === 0` every
    // character is '0', so any pair of the n - 1 gaps between characters
    // is a valid pair of cut points: C(n - 1, 2) ways. Otherwise, record
    // the positions of every '1'; the first cut may land anywhere
    // between the k-th and (k + 1)-th one (a run of trailing zeros
    // widens that window), and likewise the second cut between the
    // 2k-th and (2k + 1)-th one. The two windows never overlap, so the
    // answer is the product of their widths. JS numbers are exact up to
    // 2^53, well beyond any intermediate value here, so no separate
    // 64-bit type is needed.
    const MOD = 1_000_000_007;
    const n = s.length;
    const onesIdx = [];
    for (let i = 0; i < n; i++) {
        if (s[i] === "1") {
            onesIdx.push(i);
        }
    }
    const total = onesIdx.length;
    if (total % 3 !== 0) {
        return 0;
    }
    if (total === 0) {
        return (((n - 1) * (n - 2)) / 2) % MOD;
    }
    const k = Math.floor(total / 3);
    const left = onesIdx[k] - onesIdx[k - 1];
    const right = onesIdx[2 * k] - onesIdx[2 * k - 1];
    return (left * right) % MOD;
};
