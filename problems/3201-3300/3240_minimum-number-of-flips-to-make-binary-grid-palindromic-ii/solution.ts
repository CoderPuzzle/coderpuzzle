function minFlips(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    // Reflections in both axes partition the cells into orbits that must
    // end uniform: quadrant quadruples, pairs along the middle row/column
    // of odd dimensions, and the lone center when both are odd. Price
    // each orbit at its cheaper value first.
    const halfM = m >> 1;
    const halfN = n >> 1;
    let cost = 0;
    for (let i = 0; i < halfM; ++i) {
        for (let j = 0; j < halfN; ++j) {
            const ones = grid[i][j] + grid[i][n - 1 - j] + grid[m - 1 - i][j] + grid[m - 1 - i][n - 1 - j];
            cost += Math.min(ones, 4 - ones);
        }
    }
    let splits = 0;
    let uniforms = 0;
    if (m % 2 === 1) {
        for (let j = 0; j < halfN; ++j) {
            const ones = grid[halfM][j] + grid[halfM][n - 1 - j];
            cost += Math.min(ones, 2 - ones);
            if (ones === 1) {
                ++splits;
            } else if (ones === 2) {
                ++uniforms;
            }
        }
    }
    if (n % 2 === 1) {
        for (let i = 0; i < halfM; ++i) {
            const ones = grid[i][halfN] + grid[m - 1 - i][halfN];
            cost += Math.min(ones, 2 - ones);
            if (ones === 1) {
                ++splits;
            } else if (ones === 2) {
                ++uniforms;
            }
        }
    }
    // Divisibility reads only the small orbits: a quadruple holds a
    // multiple of four 1s either way, a finished pair holds two, the
    // center one. So 2t + z must be 0 mod 4 — the center can never sit
    // at 1 (2t + 1 is odd) and clears for its own price, and the pairs
    // parked at 1 must be even in number. A split pair re-tunes between
    // equal-cost states for free; otherwise one uniform pair pays 2 to
    // switch to its dearer value.
    if (m % 2 === 1 && n % 2 === 1) {
        cost += grid[halfM][halfN];
    }
    if (splits === 0 && uniforms % 2 === 1) {
        cost += 2;
    }
    return cost;
}
