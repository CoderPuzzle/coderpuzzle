function countPyramids(grid: number[][]): number {
    const countDirection = (forward: boolean): number => {
        const rows = grid.length;
        const columns = grid[0].length;
        let towardBase = new Array<number>(columns).fill(0);
        let total = 0;
        for (let offset = 0; offset < rows; offset++) {
            const row = forward ? offset : rows - 1 - offset;
            const current = new Array<number>(columns).fill(0);
            for (let column = 0; column < columns; column++) {
                if (grid[row][column] === 0) continue;
                current[column] = 1;
                if (column > 0 && column + 1 < columns && towardBase[column] > 0) {
                    current[column] += Math.min(towardBase[column - 1], towardBase[column + 1]);
                }
                total += current[column] - 1;
            }
            towardBase = current;
        }
        return total;
    };

    return countDirection(false) + countDirection(true);
}
