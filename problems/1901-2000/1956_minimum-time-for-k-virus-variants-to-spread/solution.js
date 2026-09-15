/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var minDayskVariants = function (points, k) {
    // At day t a variant reaches exactly the L1 ball of radius t around its
    // origin, so the answer is min over every lattice point p of the k-th
    // smallest L1 distance from p to the n origins. Any point outside the
    // bounding box can be projected onto the box, which only shrinks every
    // distance, so the minimizer lies inside it. With coordinates bounded by
    // 100 the box has at most 100*100 points and n <= 50, so sorting the n
    // distances per point is cheap.
    let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
    for (const [x, y] of points) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }
    let best = Infinity;
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const dists = points.map(([xi, yi]) => Math.abs(x - xi) + Math.abs(y - yi));
            dists.sort((a, b) => a - b);
            best = Math.min(best, dists[k - 1]);
        }
    }
    return best;
};
