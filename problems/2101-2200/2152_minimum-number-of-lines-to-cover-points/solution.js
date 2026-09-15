/**
 * @param {number[][]} points
 * @return {number}
 */
var minimumLines = function (points) {
    // At most 10 points, so the set of covered points fits in a bitmask:
    // dp[covered] = fewest lines covering exactly that subset. In each
    // state the lowest uncovered point i is covered by the next line, so
    // trying i alone and every line through i and one more uncovered
    // point j exhausts every option.
    const n = points.length;
    const full = (1 << n) - 1;
    // lineMask[i][j] = all points on the straight line through i and j;
    // coordinates bounded by 100 keep every cross product far below
    // Number's 2^53 ceiling, so plain arithmetic stays exact.
    const lineMask = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i === j) {
                continue;
            }
            const dx1 = points[j][0] - points[i][0];
            const dy1 = points[j][1] - points[i][1];
            let mask = (1 << i) | (1 << j);
            for (let k = 0; k < n; k++) {
                const dx2 = points[k][0] - points[i][0];
                const dy2 = points[k][1] - points[i][1];
                if (k !== i && k !== j && dx1 * dy2 === dy1 * dx2) {
                    mask |= 1 << k;
                }
            }
            lineMask[i][j] = mask;
        }
    }
    const unreachable = n + 1;
    const dp = new Array(full + 1).fill(unreachable);
    dp[0] = 0;
    for (let covered = 0; covered < full; covered++) {
        if (dp[covered] === unreachable) {
            continue;
        }
        let i = 0;
        while (covered & (1 << i)) {
            i++;
        }
        let nxt = covered | (1 << i);
        if (dp[covered] + 1 < dp[nxt]) {
            dp[nxt] = dp[covered] + 1;
        }
        for (let j = 0; j < n; j++) {
            if (j === i || covered & (1 << j)) {
                continue;
            }
            nxt = covered | lineMask[i][j];
            if (dp[covered] + 1 < dp[nxt]) {
                dp[nxt] = dp[covered] + 1;
            }
        }
    }
    return dp[full];
};
