/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var luckyNumbers = function (matrix) {
    const rowMin = matrix.map((row) => Math.min(...row));
    const cols = matrix[0].length;
    const colMax = [];
    for (let c = 0; c < cols; c++) {
        let best = -Infinity;
        for (const row of matrix) best = Math.max(best, row[c]);
        colMax.push(best);
    }
    const lucky = [];
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === rowMin[r] && matrix[r][c] === colMax[c]) {
                lucky.push(matrix[r][c]);
            }
        }
    }
    return lucky.sort((a, b) => a - b);
};
