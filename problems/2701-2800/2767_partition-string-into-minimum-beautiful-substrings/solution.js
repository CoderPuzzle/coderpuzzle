/**
 * @param {string} s
 * @return {number}
 */
var minimumBeautifulSubstrings = function (s) {
    const n = s.length;
    // dp[i] holds the minimum number of beautiful pieces covering the suffix
    // s.slice(i). A longer first piece can strand a remainder that cannot be
    // split at all, so every cut point j is tried, not just the longest or
    // shortest beautiful prefix. More pieces than cutting everywhere is
    // impossible, so n + 1 acts as infinity; entries no transition reaches
    // stay there and the unreachability propagates through the table.
    const dp = new Array(n + 1).fill(n + 1);
    dp[n] = 0;
    for (let i = n - 1; i >= 0; --i) {
        // A '0' at the left edge disqualifies the piece immediately:
        // leading zeros are never beautiful, whatever value follows.
        if (s[i] === "0") continue;
        let value = 0;
        for (let j = i; j < n; ++j) {
            // Build the piece's value incrementally — multiply by two and add
            // the next bit — then certify it with the division loop: divide by
            // five while divisible; a quotient of one means a power of five
            // (ten divides down to two, not one).
            value = value * 2 + (s.charCodeAt(j) - 48);
            let rest = value;
            while (rest % 5 === 0) rest /= 5;
            if (rest === 1 && dp[j + 1] + 1 < dp[i]) dp[i] = dp[j + 1] + 1;
        }
    }
    return dp[0] > n ? -1 : dp[0];
};
