function nearestValidPoint(x: number, y: number, points: number[][]): number {
    // A valid point already agrees with one coordinate, so its Manhattan
    // distance is just the absolute gap on the other coordinate.
    let bestDist = Infinity;
    let bestIndex = -1;
    for (let i = 0; i < points.length; i++) {
        const a = points[i][0];
        const b = points[i][1];
        if (a === x || b === y) {
            const dist = a === x ? Math.abs(b - y) : Math.abs(a - x);
            // Strict improvement only: an equal distance keeps the earlier
            // index, which is exactly the statement's tie rule.
            if (dist < bestDist) {
                bestDist = dist;
                bestIndex = i;
            }
        }
    }
    return bestIndex;
}
