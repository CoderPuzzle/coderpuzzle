/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var maxScore = function (a, b) {
    // dp[t][j] = best score using the first j elements of b with exactly t
    // picks made; dp[t][j] = max(dp[t][j-1], dp[t-1][j-1] + a[t-1] * b[j]).
    // Each row reads only the previous row, so four rolling variables carry
    // everything; update counts from high to low so each element is consumed
    // at most once. Scores reach +-4e10, far below Number's exact 2^53
    // limit.
    const ninf = -1e15;
    let d1 = ninf,
        d2 = ninf,
        d3 = ninf,
        d4 = ninf;
    for (const x of b) {
        if (d3 !== ninf) d4 = Math.max(d4, d3 + a[3] * x);
        if (d2 !== ninf) d3 = Math.max(d3, d2 + a[2] * x);
        if (d1 !== ninf) d2 = Math.max(d2, d1 + a[1] * x);
        d1 = Math.max(d1, a[0] * x);
    }
    return d4;
};
