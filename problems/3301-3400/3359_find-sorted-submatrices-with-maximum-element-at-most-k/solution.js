/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function (grid, k) {
    // Sweep row by row. run[j] is the longest non-increasing run of cells
    // <= k ending at column j in the current row, so a column span of
    // width w ending at j is row-valid exactly when run[j] >= w. Per
    // column, a monotonic stack of the run lengths seen so far keeps the
    // running sum of minima over every stack segment; that sum counts the
    // submatrices whose bottom-right corner is the current cell. The count
    // reaches C(m+1,2)*C(n+1,2) ~ 2.5e11 — past 32 bits but safely below
    // 2^53, so Number arithmetic stays exact.
    const m = grid.length;
    const n = grid[0].length;
    const stackVal = Array.from({ length: n }, () => []);
    const stackWid = Array.from({ length: n }, () => []);
    const tops = new Array(n).fill(0);
    const sums = new Array(n).fill(0);
    let total = 0;
    for (let i = 0; i < m; i++) {
        const row = grid[i];
        let prevVal = 0;
        let prevRun = 0;
        for (let j = 0; j < n; j++) {
            const v = row[j];
            let r;
            if (v > k) {
                r = 0;
            } else if (prevRun > 0 && prevVal >= v) {
                r = prevRun + 1;
            } else {
                r = 1;
            }
            const stV = stackVal[j];
            const stW = stackWid[j];
            let t = tops[j];
            let s = sums[j];
            let w = 1;
            while (t > 0 && stV[t - 1] >= r) {
                t--;
                s -= stV[t] * stW[t];
                w += stW[t];
            }
            stV[t] = r;
            stW[t] = w;
            tops[j] = t + 1;
            s += r * w;
            sums[j] = s;
            total += s;
            prevVal = v;
            prevRun = r;
        }
    }
    return total;
};
