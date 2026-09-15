/**
 * @param {number[][]} grid
 * @return {number}
 */
var gridGame = function (grid) {
    let topRemaining = grid[0].reduce((sum, points) => sum + points, 0);
    let bottomPrefix = 0;
    let answer = Infinity;
    for (let column = 0; column < grid[0].length; ++column) {
        topRemaining -= grid[0][column];
        answer = Math.min(answer, Math.max(topRemaining, bottomPrefix));
        bottomPrefix += grid[1][column];
    }
    return answer;
};
