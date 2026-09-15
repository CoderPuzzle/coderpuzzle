/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    // dp[i] = minimum path sum from column i of the current row to the
    // bottom. The last row seeds it directly: a path starting there is
    // just that cell.
    const dp = triangle[triangle.length - 1].slice();
    // Work bottom-up: every cell has exactly the two children i and i+1
    // below, so no ragged-edge special cases like a top-down sweep.
    for (let row = triangle.length - 2; row >= 0; row--) {
        for (let i = 0; i < triangle[row].length; i++) {
            // Ascending i is safe in place: dp[i+1] still holds the row
            // below's value when read. dp shrinks to dp[0] at the apex.
            dp[i] = triangle[row][i] + Math.min(dp[i], dp[i + 1]);
        }
    }
    return dp[0];
};
