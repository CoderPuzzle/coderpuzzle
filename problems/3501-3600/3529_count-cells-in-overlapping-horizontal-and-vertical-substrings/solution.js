/**
 * @param {string[][]} grid
 * @param {string} pattern
 * @return {number}
 */
var countCells = function (grid, pattern) {
    const m = grid.length,
        n = grid[0].length;
    const total = m * n;
    const length = pattern.length;

    // KMP failure function over the pattern.
    const fail = new Array(length).fill(0);
    for (let i = 1, k = 0; i < length; i++) {
        while (k > 0 && pattern[i] !== pattern[k]) k = fail[k - 1];
        if (pattern[i] === pattern[k]) k++;
        fail[i] = k;
    }
    const starts = (text) => {
        const found = [];
        for (let i = 0, k = 0; i < text.length; i++) {
            while (k > 0 && text[i] !== pattern[k]) k = fail[k - 1];
            if (text[i] === pattern[k]) k++;
            if (k === length) {
                found.push(i - length + 1);
                k = fail[k - 1];
            }
        }
        return found;
    };

    // Horizontal reads = row-major flatten; vertical reads = column-major.
    const horizontal = grid.map((row) => row.join("")).join("");
    const verticalCells = [];
    for (let c = 0; c < n; c++) for (let r = 0; r < m; r++) verticalCells.push(grid[r][c]);
    const vertical = verticalCells.join("");

    // Difference arrays over the two flatten orders; a match covers
    // positions start .. start + length - 1 in its own flatten order.
    const hmark = new Array(total + 1).fill(0);
    const vmark = new Array(total + 1).fill(0);
    for (const start of starts(horizontal)) {
        hmark[start]++;
        hmark[start + length]--;
    }
    for (const start of starts(vertical)) {
        vmark[start]++;
        vmark[start + length]--;
    }
    for (let i = 0; i < total; i++) {
        hmark[i + 1] += hmark[i];
        vmark[i + 1] += vmark[i];
    }

    // A cell (r, c) sits at row-major position r*n+c and column-major
    // position c*m+r; it counts iff both marks cover it.
    let covered = 0;
    for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (hmark[r * n + c] > 0 && vmark[c * m + r] > 0) covered++;
    return covered;
};
