function zigzagTraversal(grid: number[][]): number[] {
    // Sweep the rows in zigzag order (even rows left-to-right, odd rows
    // reversed) flipping a take/skip toggle at every cell.
    const result: number[] = [];
    let take = true;
    for (let i = 0; i < grid.length; ++i) {
        const row = grid[i];
        const step = i % 2 === 0 ? 1 : -1;
        const start = i % 2 === 0 ? 0 : row.length - 1;
        for (let k = 0; k < row.length; ++k) {
            const value = row[start + k * step];
            if (take) result.push(value);
            take = !take;
        }
    }
    return result;
}
