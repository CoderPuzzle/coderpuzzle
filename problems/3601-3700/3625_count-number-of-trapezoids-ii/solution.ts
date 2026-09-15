function countTrapezoids(points: number[][]): number {
    // Hash every segment by its sign-fixed reduced slope, and within a
    // slope by its line intercept: two segments sharing a slope but lying
    // on different lines never share an endpoint and always span a convex
    // quadrilateral, while same-line pairs are degenerate. Per slope the
    // valid base-pairs are C(m,2) minus the same-line C(c,2) sums. A
    // parallelogram has two parallel-side pairs and is therefore counted
    // in two slope buckets; hashing segments by diagonal midpoint
    // (excluding equal-slope pairs, i.e. collinear quadruples) counts
    // each parallelogram exactly once, so one subtraction makes every
    // convex quad with parallel sides count once. Bucket counts reach
    // C(125000, 2) ~ 7.8e9 < 2^53, so Number math is exact.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const n = points.length;
    const slopeLines = new Map<string, Map<number, number>>();
    const midSlopes = new Map<string, Map<string, number>>();
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            let dx = points[j][0] - points[i][0];
            let dy = points[j][1] - points[i][1];
            const g = gcd(Math.abs(dx), Math.abs(dy));
            dx = Math.trunc(dx / g);
            dy = Math.trunc(dy / g);
            if (dx < 0 || (dx === 0 && dy < 0)) {
                dx = -dx;
                dy = -dy;
            }
            const x1 = points[i][0];
            const y1 = points[i][1];
            const slopeKey = `${dy},${dx}`;
            if (!slopeLines.has(slopeKey)) slopeLines.set(slopeKey, new Map());
            const lines = slopeLines.get(slopeKey)!;
            const lineKey = dx * y1 - dy * x1;
            lines.set(lineKey, (lines.get(lineKey) || 0) + 1);
            const midKey = `${points[i][0] + points[j][0]},${points[i][1] + points[j][1]}`;
            if (!midSlopes.has(midKey)) midSlopes.set(midKey, new Map());
            const slopes = midSlopes.get(midKey)!;
            slopes.set(slopeKey, (slopes.get(slopeKey) || 0) + 1);
        }
    }
    let total = 0;
    for (const lines of slopeLines.values()) {
        let m = 0;
        for (const c of lines.values()) m += c;
        total += (m * (m - 1)) / 2;
        for (const c of lines.values()) total -= (c * (c - 1)) / 2;
    }
    let parallelograms = 0;
    for (const slopes of midSlopes.values()) {
        let c = 0;
        for (const s of slopes.values()) c += s;
        parallelograms += (c * (c - 1)) / 2;
        for (const s of slopes.values()) parallelograms -= (s * (s - 1)) / 2;
    }
    return total - parallelograms;
}
