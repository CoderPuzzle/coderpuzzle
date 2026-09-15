// The three projections never interact: the top view counts nonzero cells,
// the other two are silhouettes of row and column maxima. One row-major
// sweep banks the footprint and each row's tallest tower; a second sweep
// collects the column maxima.
function projectionArea(grid: number[][]): number {
    const n = grid.length;
    let total = 0;
    for (const row of grid) {
        let tallest = 0;
        for (const v of row) {
            if (v !== 0) {
                total += 1;
            }
            if (v > tallest) {
                tallest = v;
            }
        }
        total += tallest;
    }
    for (let j = 0; j < n; ++j) {
        let tallest = 0;
        for (const row of grid) {
            if (row[j] > tallest) {
                tallest = row[j];
            }
        }
        total += tallest;
    }
    return total;
}
