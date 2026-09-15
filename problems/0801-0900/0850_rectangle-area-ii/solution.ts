function rectangleArea(rectangles: number[][]): number {
    const MOD = 1000000007;
    if (rectangles.length === 0) return 0;
    // Split multiplication to dodge double-precision loss.
    function mulmod(a: number, b: number, m: number): number {
        const A = 32768;
        const a1 = Math.floor(a / A);
        const a0 = a % A;
        return (((a1 * b) % m) * A + a0 * b) % m;
    }
    // Coordinate compression: with at most 2R distinct values per
    // axis, cell boundaries are exactly the rectangle edges, so
    // coverage is constant within each cell.
    const xsSet = new Set<number>();
    const ysSet = new Set<number>();
    for (const rect of rectangles) {
        xsSet.add(rect[0]);
        xsSet.add(rect[2]);
        ysSet.add(rect[1]);
        ysSet.add(rect[3]);
    }
    const xs = Array.from(xsSet).sort((a, b) => a - b);
    const ys = Array.from(ysSet).sort((a, b) => a - b);
    const xIndex = new Map<number, number>();
    xs.forEach((x, i) => xIndex.set(x, i));
    const yIndex = new Map<number, number>();
    ys.forEach((y, i) => yIndex.set(y, i));
    const nx = xs.length - 1;
    const ny = ys.length - 1;
    const grid: boolean[][] = [];
    for (let i = 0; i < nx; i++) {
        grid.push(new Array(ny).fill(false));
    }
    // Mark the half-open compressed range: adjacent rectangles
    // share edge cells without overlap or gaps, and idempotent
    // marking counts overlaps once.
    for (const [x1, y1, x2, y2] of rectangles) {
        for (let i = xIndex.get(x1)!; i < xIndex.get(x2)!; i++) {
            for (let j = yIndex.get(y1)!; j < yIndex.get(y2)!; j++) {
                grid[i][j] = true;
            }
        }
    }
    // Sum the real areas of marked cells, reducing at each step.
    let total = 0;
    for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
            if (grid[i][j]) {
                total = (total + mulmod(xs[i + 1] - xs[i], ys[j + 1] - ys[j], MOD)) % MOD;
            }
        }
    }
    return total;
}
