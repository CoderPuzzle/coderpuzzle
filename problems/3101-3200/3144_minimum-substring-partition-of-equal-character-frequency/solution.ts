function minimumSubstringsInPartition(s: string): number {
    // dp[i] = fewest balanced pieces covering the first i characters.
    // Extending a candidate start leftwards one letter at a time keeps its
    // counts in a table while tracking how many letters are live and the
    // largest count seen; the window is balanced exactly when
    // live * largest equals its length, which makes each dp[i] one
    // backwards sweep away.
    const n = s.length;
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= n; ++i) {
        const counts = new Array(26).fill(0);
        let live = 0;
        let top = 0;
        for (let right = i - 1; right >= 0; --right) {
            const b = s.charCodeAt(right) - 97;
            if (counts[b] === 0) ++live;
            ++counts[b];
            if (counts[b] > top) top = counts[b];
            if (live * top === i - right && dp[right] + 1 < dp[i]) {
                dp[i] = dp[right] + 1;
            }
        }
    }
    return dp[n];
}
