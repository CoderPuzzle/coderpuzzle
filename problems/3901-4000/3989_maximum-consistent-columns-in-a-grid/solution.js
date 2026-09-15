/**
 * @param {number[][]} grid
 * @param {number} limit
 * @return {number}
 */
var maxConsistentColumns = function (grid, limit) {
    const rows = grid.length;
    const cols = grid[0].length;
    const compatible = Array.from({ length: cols }, () => new Array(cols).fill(false));
    for (let a = 0; a < cols; a++) {
        for (let b = a + 1; b < cols; b++) {
            let ok = true;
            for (let r = 0; r < rows; r++) {
                if (Math.abs(grid[r][b] - grid[r][a]) > limit) {
                    ok = false;
                    break;
                }
            }
            compatible[a][b] = ok;
        }
    }

    const dp = new Array(cols).fill(1);
    let answer = 1;
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < j; i++) {
            if (compatible[i][j]) dp[j] = Math.max(dp[j], dp[i] + 1);
        }
        answer = Math.max(answer, dp[j]);
    }
    return answer;
};
