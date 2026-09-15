function minAreaRect(points: number[][]): number {
    // A rectangle with sides parallel to the axes is pinned by two opposite
    // corners: (x1, y1) and (x2, y2) with x1 != x2 and y1 != y2 close one
    // exactly when (x1, y2) and (x2, y1) are also present, and its area is
    // |x1 - x2| * |y1 - y2|. Coordinates lie in [0, 40000], so
    // x * 40001 + y encodes a point as one exact key, and every pair is
    // tried as a candidate diagonal with two O(1) membership tests
    // deciding whether the rectangle exists.
    const seen = new Set<number>();
    for (const [x, y] of points) {
        seen.add(x * 40001 + y);
    }
    let best = 0;
    for (let i = 0; i < points.length; i++) {
        const x1 = points[i][0];
        const y1 = points[i][1];
        for (let j = i + 1; j < points.length; j++) {
            const x2 = points[j][0];
            const y2 = points[j][1];
            if (x1 === x2 || y1 === y2) {
                continue; // a diagonal needs both coordinates to differ
            }
            if (seen.has(x1 * 40001 + y2) && seen.has(x2 * 40001 + y1)) {
                const area = Math.abs(x1 - x2) * Math.abs(y1 - y2);
                if (best === 0 || area < best) {
                    best = area;
                }
            }
        }
    }
    return best;
}
