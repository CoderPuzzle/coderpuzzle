/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var modifiedMatrix = function (matrix) {
    // Each column holds at least one non-negative value, so the plain
    // column maximum is never the -1 sentinel itself and is exactly
    // what every -1 of that column should become.
    const m = matrix.length;
    const n = matrix[0].length;
    const answer = matrix.map((row) => [...row]);
    for (let j = 0; j < n; ++j) {
        let best = matrix[0][j];
        for (let i = 1; i < m; ++i) {
            best = Math.max(best, matrix[i][j]);
        }
        for (let i = 0; i < m; ++i) {
            if (answer[i][j] === -1) {
                answer[i][j] = best;
            }
        }
    }
    return answer;
};
