/**
 * @param {string} s
 * @return {number}
 */
var countHomogenous = function (s) {
    // Each position is charged with the number of homogenous
    // substrings ending there — the current run length — so the
    // running total realizes the per-run triangle sums directly.
    const MOD = 1000000007;
    let total = 0;
    let run = 0;
    let prev = "";
    for (const c of s) {
        run = c === prev && run > 0 ? run + 1 : 1;
        prev = c;
        total = (total + run) % MOD;
    }
    return total;
};
