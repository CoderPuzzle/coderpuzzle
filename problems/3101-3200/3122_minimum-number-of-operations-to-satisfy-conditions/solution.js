/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
    // Vertical equality makes each column one constant value; horizontal
    // inequality only links adjacent columns. dp[v] = cheapest total for
    // processed columns ending with value v, extended over the ten digits
    // that grid cells may hold.
    const rows = grid.length;
    let previous = new Array(10).fill(0);
    for (let j = 0; j < grid[0].length; j++) {
        const counts = new Array(10).fill(0);
        for (const row of grid) {
            counts[row[j]]++;
        }
        const current = [];
        for (let value = 0; value < 10; value++) {
            let bestPrev = Infinity;
            for (let k = 0; k < 10; k++) {
                if (k !== value && previous[k] < bestPrev) {
                    bestPrev = previous[k];
                }
            }
            current.push(rows - counts[value] + bestPrev);
        }
        previous = current;
    }
    return Math.min(...previous);
};
