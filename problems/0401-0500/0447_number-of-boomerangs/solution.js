/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
    let total = 0;
    for (let i = 0; i < points.length; ++i) {
        // A boomerang is pinned by its apex: the other two points merely
        // have to sit at the same distance from it, so group every other
        // point by squared distance — equal squares mean equal lengths,
        // and no square root ever gets the chance to round.
        const counts = new Map();
        for (let j = 0; j < points.length; ++j) {
            if (j === i) continue;
            const dx = points[j][0] - points[i][0];
            const dy = points[j][1] - points[i][1];
            const d2 = dx * dx + dy * dy;
            counts.set(d2, (counts.get(d2) || 0) + 1);
        }
        // c points at one distance fill the two ordered slots of the
        // tuple in c * (c - 1) ways — either of them may come first.
        for (const c of counts.values()) {
            total += c * (c - 1);
        }
    }
    return total;
};
