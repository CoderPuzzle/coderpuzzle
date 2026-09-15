function shiftGrid(grid: number[][], k: number): number[][] {
    const m = grid.length,
        n = grid[0].length;
    const total = m * n;
    k %= total;
    // One shift = a cyclic right-rotation of the flattened grid.
    const shifted: number[] = new Array(total).fill(0);
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            shifted[(r * n + c + k) % total] = grid[r][c];
        }
    }
    return Array.from({ length: m }, (_, r) => shifted.slice(r * n, (r + 1) * n));
}
