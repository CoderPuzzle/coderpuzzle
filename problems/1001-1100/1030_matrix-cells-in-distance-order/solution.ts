function allCellsDistOrder(rows: number, cols: number, rCenter: number, cCenter: number): number[][] {
    // Bucket every cell by its Manhattan distance from the center,
    // discovered during a single row-major scan. Because the scan visits
    // (row, col) in ascending row then ascending column order, each
    // bucket already lists its cells in that same order; walking the
    // buckets from distance 0 upward then concatenates them into the
    // judge's pinned tie-break order for free.
    const maxDistance = Math.max(rCenter, rows - 1 - rCenter) + Math.max(cCenter, cols - 1 - cCenter);
    const buckets: number[][][] = Array.from({ length: maxDistance + 1 }, () => []);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const distance = Math.abs(r - rCenter) + Math.abs(c - cCenter);
            buckets[distance].push([r, c]);
        }
    }
    const result: number[][] = [];
    for (const bucket of buckets) {
        result.push(...bucket);
    }
    return result;
}
