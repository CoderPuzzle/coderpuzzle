function kClosest(points: number[][], k: number): number[][] {
    const pts = points.map((p) => [p[0], p[1]]);
    // Squared distance ranks points identically to the Euclidean
    // distance (sqrt is monotone) while staying integer-exact.
    pts.sort((a, b) => a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]));
    return pts.slice(0, k);
}
