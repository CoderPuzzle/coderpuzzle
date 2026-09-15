/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {string[]}
 */
var createGrid = function (m, n, k) {
    if (m === 1 || n === 1) {
        if (k !== 1) {
            return [];
        }
        return new Array(m).fill(".".repeat(n));
    }

    // [height, width, is the 3x3 k=4 pattern] per k, tried in order.
    let blocks;
    if (k === 1) {
        blocks = [[1, 1, false]];
    } else if (k === 2) {
        blocks = [[2, 2, false]];
    } else if (k === 3) {
        blocks = [
            [2, 3, false],
            [3, 2, false],
        ];
    } else {
        blocks = [
            [2, 4, false],
            [4, 2, false],
            [3, 3, true],
        ];
    }
    for (const [height, width, cornersBlocked] of blocks) {
        if (height > m || width > n) {
            continue;
        }
        const grid = Array.from({ length: m }, () => "#".repeat(n).split(""));
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                grid[i][j] = ".";
            }
        }
        if (cornersBlocked) {
            grid[0][width - 1] = "#";
            grid[height - 1][0] = "#";
        }
        for (let j = width - 1; j < n; j++) {
            grid[height - 1][j] = ".";
        }
        for (let i = height - 1; i < m; i++) {
            grid[i][n - 1] = ".";
        }
        return grid.map((row) => row.join(""));
    }
    return [];
};
