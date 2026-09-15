// Every triangle is three of the points, and at most C(50,3) = 19,600
// triples is few enough to enumerate them all: three nested loops over
// i < j < k keep the largest area. The area is half the absolute cross
// product of the edge vectors b - a and c - a, kept in exact integers
// until the single final division by 2 — a power of two, so the returned
// double is exact and a degenerate (collinear) triple simply contributes
// area 0.
function largestTriangleArea(points: number[][]): number {
    const n = points.length;
    let best = 0.0;
    for (let i = 0; i < n; i += 1) {
        const ax = points[i][0];
        const ay = points[i][1];
        for (let j = i + 1; j < n; j += 1) {
            const ux = points[j][0] - ax;
            const uy = points[j][1] - ay;
            for (let k = j + 1; k < n; k += 1) {
                // Every product here is an integer well inside 2^53, so
                // the cross is exact in a JS number, no i64 needed.
                const cross = ux * (points[k][1] - ay) - uy * (points[k][0] - ax);
                const area = Math.abs(cross) / 2.0;
                if (area > best) {
                    best = area;
                }
            }
        }
    }
    return best;
}
