/**
 * @param {string} s
 * @return {number}
 */
var numPermsDISequence = function (s) {
    // dp[i][j] counts ways to fill the first i+1 positions, valid so
    // far, with position i holding the j-th smallest value placed.
    // Appending a value of new rank j shifts older ranks >= j up one,
    // so an 'I' step admits exactly the old ranks below j and a 'D'
    // step the old ranks j and above — both are prefix sums of the
    // previous row: P[j] for 'I', P[m] - P[j] for 'D'. One rolling
    // row carries the table; the answer is sum dp[n][*].
    const MOD = 1_000_000_007;
    let dp = [1];
    for (let i = 0; i < s.length; ++i) {
        const m = dp.length;
        const prefix = [0];
        for (let j = 0; j < m; ++j) {
            prefix.push((prefix[j] + dp[j]) % MOD);
        }
        if (s[i] === "I") {
            dp = prefix;
        } else {
            const next = [];
            for (let j = 0; j <= m; ++j) {
                next.push((prefix[m] - prefix[j] + MOD) % MOD);
            }
            dp = next;
        }
    }
    let total = 0;
    for (const v of dp) {
        total += v;
    }
    return total % MOD;
};
