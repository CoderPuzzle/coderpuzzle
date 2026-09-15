/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @param {number[]} diff
 * @return {number}
 */
var findMaxVal = function (n, restrictions, diff) {
    const INF = Infinity;

    // Upper bound per position from left-propagated caps and
    // restrictions. Position 0 carries the sequence's own anchor:
    // a[0] = 0, so no value can exceed what diff allows away from it.
    const cap = new Array(n).fill(INF);
    cap[0] = 0;
    for (const [idx, maxVal] of [...restrictions].sort((x, y) => x[0] - y[0])) {
        if (maxVal < cap[idx]) {
            cap[idx] = maxVal;
        }
    }
    for (let i = 1; i < n; i++) {
        if (cap[i - 1] + diff[i - 1] < cap[i]) {
            cap[i] = cap[i - 1] + diff[i - 1];
        }
    }

    // Right pass mirrors it: a tight bound at j also caps every
    // position i < j to cap[j] + sum(diff[i..j-1]).
    for (let i = n - 2; i >= 0; i--) {
        if (cap[i + 1] + diff[i] < cap[i]) {
            cap[i] = cap[i + 1] + diff[i];
        }
    }

    // The optimal sequence attains every bound simultaneously, so the
    // largest value in it is the largest bound.
    let answer = 0;
    for (let i = 0; i < n; i++) {
        if (cap[i] > answer) {
            answer = cap[i];
        }
    }
    return answer;
};
