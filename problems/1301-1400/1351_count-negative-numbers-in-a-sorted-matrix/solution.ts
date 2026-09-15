function countNegatives(grid: number[][]): number {
    // Negatives are a per-row suffix and the boundary only moves left down
    // the columns, so one monotonically sliding pointer counts all.
    const n = grid[0].length;
    let count = 0;
    let col = n - 1;
    for (const row of grid) {
        while (col >= 0 && row[col] < 0) {
            --col;
        }
        count += n - 1 - col;
    }
    return count;
}
