function minAreaFreeRect(points: number[][]): number {
    // A quadrilateral is a rectangle exactly when its two diagonals bisect
    // each other (shared midpoint) and have equal length: bisection makes
    // it a parallelogram, and equal diagonals make a parallelogram
    // rectangular. So every pair of points is hashed as a candidate
    // diagonal, and a match hands over both diagonals of a rectangle whose
    // four corners are all present. The doubled midpoint (x1 + x2, y1 + y2)
    // — integral even when the true midpoint is half-integral — packs into
    // one exact number key as (x1 + x2) * 80001 + (y1 + y2), every piece
    // an integer far below 2^53; the squared diagonal length rides along
    // inside each bucket entry.
    const diagonals = new Map<number, number[][]>();
    let best2 = 0;
    const n = points.length;
    for (let i = 0; i < n; i += 1) {
        const x1 = points[i][0];
        const y1 = points[i][1];
        for (let j = i + 1; j < n; j += 1) {
            const x2 = points[j][0];
            const y2 = points[j][1];
            const center = (x1 + x2) * 80001 + (y1 + y2);
            const length2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
            let bucket = diagonals.get(center);
            if (bucket === undefined) {
                bucket = [];
                diagonals.set(center, bucket);
            }
            for (const stored of bucket) {
                if (stored[2] !== length2) {
                    continue; // shared midpoint, different diagonal length
                }
                // The stored endpoint r marks one diagonal; its reflection
                // through the shared midpoint marks the other. The
                // rectangle's sides at (x1, y1) run to r and to that
                // reflection, whose offset is (x2 - rx, y2 - ry).
                const ux = stored[0] - x1;
                const uy = stored[1] - y1;
                const vx = x2 - stored[0];
                const vy = y2 - stored[1];
                const area2 = (ux * ux + uy * uy) * (vx * vx + vy * vy);
                if (best2 === 0 || area2 < best2) {
                    best2 = area2;
                }
            }
            bucket.push([x1, y1, length2]);
        }
    }
    // A lattice rectangle's area is always an integer — perpendicular
    // integer side vectors make the product of squared side lengths a
    // perfect square — and at most (4 * 10^4)^2 = 1.6 * 10^9. The squared
    // area can reach 2.56 * 10^18, past exact-integer range in a number,
    // yet stays faithful: rounding there errs by at most 512 while any two
    // distinct squared areas differ by millions, so the minimum survives,
    // and its square root sits within 2 * 10^-7 of the integer area, which
    // Math.round snaps onto exactly.
    return Math.round(Math.sqrt(best2));
}
