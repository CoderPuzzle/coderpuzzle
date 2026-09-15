/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let total = 0;
    // dp rows: side of the largest all-ones square whose bottom-right corner
    // sits at each cell; only the previous row is ever needed
    let prev = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        const cur = new Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            // a 0 cell ends no square; entry stays 0
            if (!matrix[i][j]) continue;
            if (i === 0 || j === 0) {
                // no room to extend past the matrix edge
                cur[j] = 1;
            } else {
                // limited by the three neighbors: above, left, diagonal
                cur[j] = Math.min(prev[j], cur[j - 1], prev[j - 1]) + 1;
            }
            // a corner of max side k covers all k nested squares ending
            // there, so summing dp values counts every square exactly once
            total += cur[j];
        }
        prev = cur;
    }
    return total;
};
