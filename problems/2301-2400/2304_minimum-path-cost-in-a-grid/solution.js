/**
 * @param {number[][]} grid
 * @param {number[][]} moveCost
 * @return {number}
 */
var minPathCost = function (grid, moveCost) {
    const columns = grid[0].length;
    let costs = grid[0].slice();
    for (let row = 1; row < grid.length; row++) {
        const previous = grid[row - 1];
        const next = [];
        for (let column = 0; column < columns; column++) {
            let best = Infinity;
            for (let source = 0; source < columns; source++) {
                best = Math.min(best, costs[source] + moveCost[previous[source]][column]);
            }
            next.push(best + grid[row][column]);
        }
        costs = next;
    }
    return Math.min(...costs);
};
