/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
    const ivs = intervals.map((iv) => [iv[0], iv[1]]);
    ivs.sort((a, b) => a[1] - b[1] || b[0] - a[0]);
    // Chosen points stay non-decreasing; points inside [s, e] are the
    // trailing run, so checking the last two suffices.
    const chosen = [];
    for (const [s, e] of ivs) {
        const m = chosen.length;
        if (m >= 2 && chosen[m - 2] >= s) continue;
        if (m >= 1 && chosen[m - 1] >= s) {
            chosen.push(e);
        } else {
            chosen.push(e - 1);
            chosen.push(e);
        }
    }
    return chosen.length;
};
