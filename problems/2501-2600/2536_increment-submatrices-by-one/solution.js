/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
    // 2-D difference trick applied row by row.
    const diff = Array.from({ length: n }, () => new Array(n + 1).fill(0));
    for (const [r1, c1, r2, c2] of queries) {
        for (let r = r1; r <= r2; r++) {
            diff[r][c1] += 1;
            diff[r][c2 + 1] -= 1;
        }
    }
    const mat = [];
    for (let r = 0; r < n; r++) {
        const row = new Array(n);
        let running = 0;
        for (let c = 0; c < n; c++) {
            running += diff[r][c];
            row[c] = running;
        }
        mat.push(row);
    }
    return mat;
};
