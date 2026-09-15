/**
 * @param {number[]} rowSum
 * @param {number[]} colSum
 * @return {number[][]}
 */
var restoreMatrix = function (rowSum, colSum) {
    const rows = rowSum.length;
    const cols = colSum.length;
    const remainingRow = rowSum.slice();
    const remainingCol = colSum.slice();
    const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const value = Math.min(remainingRow[i], remainingCol[j]);
            matrix[i][j] = value;
            remainingRow[i] -= value;
            remainingCol[j] -= value;
        }
    }
    return matrix;
};
