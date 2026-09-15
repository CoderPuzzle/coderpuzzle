function minPathCost(grid: number[][], moveCost: number[][]): number {
    const columns = grid[0].length;
    let costs: number[] = grid[0].slice();
    for (let row = 1; row < grid.length; row++) {
        const previous = grid[row - 1];
        const next: number[] = [];
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
}
