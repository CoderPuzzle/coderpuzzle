function equalPairs(grid: number[][]): number {
    // A pair (row, col) counts when both read as the identical sequence,
    // so hash each row once and look every column up in that multiset:
    // the count for a column is how many rows carry its exact sequence.
    // Values are <= 1e5, so a comma separator is unambiguous.
    const n = grid.length;
    const rowCounts = new Map<string, number>();
    for (const row of grid) {
        const key = row.join(",");
        rowCounts.set(key, (rowCounts.get(key) || 0) + 1);
    }
    let pairs = 0;
    for (let c = 0; c < n; c++) {
        const column: number[] = [];
        for (let r = 0; r < n; r++) {
            column.push(grid[r][c]);
        }
        pairs += rowCounts.get(column.join(",")) || 0;
    }
    return pairs;
}
