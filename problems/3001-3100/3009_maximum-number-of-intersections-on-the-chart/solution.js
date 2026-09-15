/**
 * @param {number[]} y
 * @return {number}
 */
var maxIntersectionCount = function (y) {
    // The count only changes when the line passes a vertex height, so
    // testing each compressed height v just above (v + 0.5) and exactly
    // at v suffices. Every segment stamps its half-level range
    // [lo, hi - 1] and its strict interior [lo + 1, hi - 1] into two
    // difference arrays; a prefix pass then reads both counts per
    // height, the at-level one plus a point for each vertex on the line.
    const heights = [...new Set(y)].sort((a, b) => a - b);
    const rank = new Map();
    heights.forEach((h, i) => rank.set(h, i));
    const above = new Array(heights.length).fill(0);
    const at = new Array(heights.length).fill(0);
    for (let i = 0; i + 1 < y.length; i++) {
        const lo = Math.min(y[i], y[i + 1]);
        const hi = Math.max(y[i], y[i + 1]);
        above[rank.get(lo)] += 1;
        above[rank.get(hi)] -= 1;
        if (hi - lo > 1) {
            at[rank.get(lo) + 1] += 1;
            at[rank.get(hi)] -= 1;
        }
    }
    const seen = new Map();
    for (const h of y) {
        seen.set(h, (seen.get(h) ?? 0) + 1);
    }
    let best = 0;
    let spansAbove = 0;
    let spansAt = 0;
    heights.forEach((h, i) => {
        spansAbove += above[i];
        spansAt += at[i];
        best = Math.max(best, spansAbove, spansAt + seen.get(h));
    });
    return best;
};
