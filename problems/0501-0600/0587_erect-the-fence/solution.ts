function outerTrees(trees: number[][]): number[][] {
    const sorted = trees.map((t) => [t[0], t[1]] as [number, number]).sort((p, q) => p[0] - q[0] || p[1] - q[1]);
    const points: [number, number][] = [];
    for (const p of sorted) {
        const last = points[points.length - 1];
        if (last && last[0] === p[0] && last[1] === p[1]) continue;
        points.push(p);
    }
    if (points.length <= 1) return points.map((p) => [p[0], p[1]]);

    const cross = (o: [number, number], a: [number, number], b: [number, number]): number =>
        (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

    // Strict convex hull vertices (cross <= 0 pops collinear interior points).
    const lower: [number, number][] = [];
    for (const p of points) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
            lower.pop();
        }
        lower.push(p);
    }
    const upper: [number, number][] = [];
    for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
            upper.pop();
        }
        upper.push(p);
    }
    const hull = lower.slice(0, lower.length - 1).concat(upper.slice(0, upper.length - 1));

    const result: number[][] = hull.map((p) => [p[0], p[1]]);
    const n = hull.length;
    if (n < 2) return points.map((p) => [p[0], p[1]]);

    const key = (p: [number, number]) => p[0] + "," + p[1];
    const inResult = new Set<string>(hull.map(key));
    // Add collinear points lying on hull edges (boundary points not at vertices).
    for (let i = 0; i < n; i++) {
        const a = hull[i];
        const b = hull[(i + 1) % n];
        for (const p of points) {
            if (inResult.has(key(p)) || (p[0] === a[0] && p[1] === a[1]) || (p[0] === b[0] && p[1] === b[1])) {
                continue;
            }
            if (cross(a, b, p) === 0) {
                if (
                    Math.min(a[0], b[0]) <= p[0] &&
                    p[0] <= Math.max(a[0], b[0]) &&
                    Math.min(a[1], b[1]) <= p[1] &&
                    p[1] <= Math.max(a[1], b[1])
                ) {
                    result.push([p[0], p[1]]);
                    inResult.add(key(p));
                }
            }
        }
    }
    return result;
}
