/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
var maxBuilding = function (n, restrictions) {
    // Only restricted points (plus building 1 at height 0) matter. Sort
    // by id; two passes make each cap consistent with reachability from
    // its neighbors; between consecutive pinned points the best peak is
    // the floor of (lh + rh + gap) / 2, and past the last pin the height
    // simply ramps to its cap + distance.
    const points = [[1, 0], ...restrictions.map((r) => [r[0], r[1]])];
    points.sort((a, b) => a[0] - b[0]);
    for (let k = 1; k < points.length; k++) {
        const reachable = points[k - 1][1] + (points[k][0] - points[k - 1][0]);
        if (reachable < points[k][1]) {
            points[k][1] = reachable;
        }
    }
    for (let k = points.length - 2; k >= 0; k--) {
        const reachable = points[k + 1][1] + (points[k + 1][0] - points[k][0]);
        if (reachable < points[k][1]) {
            points[k][1] = reachable;
        }
    }
    let best = 0;
    for (let k = 1; k < points.length; k++) {
        const gap = points[k][0] - points[k - 1][0];
        best = Math.max(best, Math.floor((points[k - 1][1] + points[k][1] + gap) / 2));
    }
    const last = points[points.length - 1];
    return Math.max(best, last[1] + (n - last[0]));
};
