// A convex polygon turns the same way at every vertex: the cross product of
// the incoming and outgoing edge vectors is positive at every left turn or
// negative at every right turn, so one sign of each anywhere is a refutation.
function isConvex(points: number[][]): boolean {
    const n = points.length;
    let positive = false;
    let negative = false;
    for (let i = 0; i < n; ++i) {
        const prev = points[(i - 1 + n) % n];
        const cur = points[i];
        const next = points[(i + 1) % n];
        const x1 = cur[0] - prev[0];
        const y1 = cur[1] - prev[1];
        const x2 = next[0] - cur[0];
        const y2 = next[1] - cur[1];
        // z == 0 means three consecutive vertices are collinear — legal
        // along an edge, so it votes for neither side.
        const z = x1 * y2 - y1 * x2;
        if (z > 0) {
            positive = true;
        } else if (z < 0) {
            negative = true;
        }
        if (positive && negative) {
            return false;
        }
    }
    return true;
}
