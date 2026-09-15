/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var minOperations = function (grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    // Every operation count is an affine function A*T + B of the target T,
    // with A always 0 or 1. Two 2D prefix sums answer the "coverage from
    // already-placed blocks" query for each cell in O(1). The answer is at
    // most m*n*1e5 ~ 1e11 < 2^53, so every step is exact in a JS Number.
    const pa = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const pb = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    let hasFixed = false;
    let fixedT = 0; // T fixed by a boundary cell
    let hasLow = false;
    let lowT = 0; // lower bound on T from X >= 0 (A == 1 cells)
    let sumA = 0;
    let sumB = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            const r1 = Math.max(0, i - k + 1);
            const c1 = Math.max(0, j - k + 1);
            const covA = rect(pa, r1, i - 1, c1, j) + rect(pa, i, i, c1, j - 1);
            const covB = rect(pb, r1, i - 1, c1, j) + rect(pb, i, i, c1, j - 1);
            let a, b;
            if (i <= m - k && j <= n - k) {
                a = 1 - covA;
                b = -grid[i][j] - covB;
                if (a === 1) {
                    if (!hasLow || -b > lowT) {
                        lowT = -b;
                        hasLow = true;
                    }
                } else if (a === 0) {
                    if (b < 0) return -1;
                } else {
                    return -1;
                }
                sumA += a;
                sumB += b;
            } else {
                // Boundary cell: grid[i][j] + cov must equal T.
                if (covA === 1) {
                    if (grid[i][j] + covB !== 0) return -1;
                } else if (covA === 0) {
                    const t = grid[i][j] + covB;
                    if (!hasFixed) {
                        fixedT = t;
                        hasFixed = true;
                    } else if (fixedT !== t) {
                        return -1;
                    }
                } else {
                    return -1;
                }
                a = 0;
                b = 0;
            }
            pa[i + 1][j + 1] = pa[i][j + 1] + pa[i + 1][j] - pa[i][j] + a;
            pb[i + 1][j + 1] = pb[i][j + 1] + pb[i + 1][j] - pb[i][j] + b;
        }
    }
    if (hasFixed) {
        if (hasLow && fixedT < lowT) return -1;
        return sumA * fixedT + sumB;
    }
    const t = hasLow ? lowT : 0;
    return sumA * t + sumB;

    function rect(p, r1, r2, c1, c2) {
        if (r1 > r2 || c1 > c2) return 0;
        return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];
    }
};
