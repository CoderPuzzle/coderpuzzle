function getMinDistSum(positions: number[][]): number {
    const n = positions.length;
    // start from the centroid, a reasonable first guess for the median
    let x = 0,
        y = 0;
    for (const p of positions) {
        x += p[0];
        y += p[1];
    }
    x /= n;
    y /= n;
    const eps = 1e-9; // keeps the weight finite if the guess lands on a customer
    for (let it = 0; it < 300; it++) {
        let numX = 0,
            numY = 0,
            weightSum = 0;
        for (const p of positions) {
            const px = p[0],
                py = p[1];
            const distance = Math.hypot(x - px, y - py) + eps;
            const weight = 1.0 / distance;
            numX += weight * px;
            numY += weight * py;
            weightSum += weight;
        }
        x = numX / weightSum;
        y = numY / weightSum;
    }
    let total = 0;
    for (const p of positions) {
        total += Math.hypot(x - p[0], y - p[1]);
    }
    return total;
}
