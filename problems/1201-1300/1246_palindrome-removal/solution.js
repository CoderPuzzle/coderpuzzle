/**
 * @param {number[]} arr
 * @return {number}
 */
var minimumMoves = function (arr) {
    const n = arr.length;
    if (n === 0) return 0;

    // dp[i][j] = min moves to erase arr[i..j]; removals concatenate the
    // surviving parts, so the cost depends only on the subarray's contents.
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) dp[i][i] = 1;
    for (let i = 0; i + 1 < n; i++) dp[i][i + 1] = arr[i] === arr[i + 1] ? 1 : 2;

    // Fill by increasing length so every referenced subinterval is final.
    for (let length = 3; length <= n; length++) {
        for (let i = 0; i + length <= n; i++) {
            const j = i + length - 1;
            // Upper bound: shed the first element in some move.
            let best = 1 + dp[i + 1][j];
            // Split: the two halves can be cleared independently —
            // removals never mix across a boundary both sides respect.
            for (let k = i; k < j; k++) {
                const candidate = dp[i][k] + dp[k + 1][j];
                if (candidate < best) best = candidate;
            }
            // Equal ends may share one move deferred to the last turn:
            // clear the interior first, then remove the pair together.
            // Peeling a matched pair never breaks palindromes, so it
            // costs nothing extra.
            if (arr[i] === arr[j] && dp[i + 1][j - 1] < best) best = dp[i + 1][j - 1];
            dp[i][j] = best;
        }
    }
    return dp[0][n - 1];
};
