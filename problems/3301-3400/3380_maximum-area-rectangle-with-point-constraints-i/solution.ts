function maxRectangleArea(points: number[][]): number {
    // Enumerate every quadruple. Four distinct points are the corners of an
    // axis-aligned rectangle exactly when they use two distinct x values
    // and two distinct y values — the four (x, y) combos then each hold one
    // of the points. The rectangle survives only if every other point lies
    // outside its closed box; with n <= 10 there are at most C(10,4) = 210
    // quads, each checked in a linear scan.
    const n = points.length;
    let best = -1;
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            for (let k = j + 1; k < n; ++k) {
                for (let l = k + 1; l < n; ++l) {
                    const quad = [points[i], points[j], points[k], points[l]];
                    const xs = new Set(quad.map((p) => p[0]));
                    const ys = new Set(quad.map((p) => p[1]));
                    if (xs.size !== 2 || ys.size !== 2) {
                        continue;
                    }
                    const [x1, x2] = [...xs].sort((a, b) => a - b);
                    const [y1, y2] = [...ys].sort((a, b) => a - b);
                    const blocked = points.some(
                        (p) => !quad.includes(p) && x1 <= p[0] && p[0] <= x2 && y1 <= p[1] && p[1] <= y2,
                    );
                    if (!blocked) {
                        best = Math.max(best, (x2 - x1) * (y2 - y1));
                    }
                }
            }
        }
    }
    return best;
}
