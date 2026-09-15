/**
 * @param {number} k
 * @return {string[]}
 */
var createGrid = function (k) {
    let e = 0;
    while (k >> (e + 1) > 0) {
        e++; // highest set bit; doublers 1..e form the chain
    }
    if (e === 0) {
        return ["."];
    }

    const width = 2 * e + 4; // collector column 2e+3 at the right edge
    const grid = Array.from({ length: 2 * e + 1 }, () => "#".repeat(width).split(""));
    grid[0][0] = "."; // start feeds doubler 1's entry (0, 2)
    grid[0][1] = ".";
    for (let d = 1; d <= e; d++) {
        for (const i of [2 * d - 2, 2 * d - 1]) {
            // open 2x2 doubler
            for (const j of [2 * d, 2 * d + 1]) {
                grid[i][j] = ".";
            }
        }
        if (d < e) {
            // forced down-then-right connector; the alternative cell
            // (2d-1, 2d+2) stays an obstacle
            grid[2 * d][2 * d + 1] = ".";
        }
    }

    let top = 2 * e;
    for (let b = 0; b < e; b++) {
        // bit b shunts from doubler (b+1)'s top-right
        if ((k >> b) & 1) {
            for (let j = 2 * b + 4; j < width; j++) {
                grid[2 * b][j] = ".";
            }
            top = Math.min(top, 2 * b);
        }
    }
    // leading bit e: the chain exit drops one row, below every other shunt,
    // then runs right to the collector column
    grid[2 * e][2 * e + 1] = ".";
    for (let j = 2 * e + 2; j < width; j++) {
        grid[2 * e][j] = ".";
    }
    for (let i = top; i <= 2 * e; i++) {
        // collector descends to (2e, 2e+3)
        grid[i][2 * e + 3] = ".";
    }
    return grid.map((row) => row.join(""));
};
