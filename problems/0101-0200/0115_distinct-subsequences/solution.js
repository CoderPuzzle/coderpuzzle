/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    const m = t.length;
    // dp[j] = ways to form the first j chars of t using the prefix of s
    // processed so far; dp[0] = 1 encodes the empty string being formable
    // exactly once, by matching nothing. BigInt keeps the additions exact
    // even for counts beyond Number's safe-integer range.
    const dp = [BigInt(1)];
    for (let j = 1; j <= m; j++) dp.push(BigInt(0));
    for (const ch of s) {
        // Sweep j downward so dp[j-1] is still the previous row's value
        // when read; a left-to-right sweep would let one character of s
        // be matched against several characters of t.
        for (let j = m; j > 0; j--) {
            // Reading ch can only create new ways where it matches: every
            // earlier way of forming t[:j-1] extends by matching ch there.
            // Elsewhere ch is simply skipped and the count is unchanged.
            if (t[j - 1] === ch) {
                dp[j] += dp[j - 1];
            }
        }
    }
    return Number(dp[m]);
};
