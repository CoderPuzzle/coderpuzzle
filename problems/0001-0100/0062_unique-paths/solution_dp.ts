function uniquePaths(m: number, n: number): number {
    // One rolling row, seeded with the all-ones counts of the first row.
    const row: number[] = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        // row[j] still holds the count from the cell above while row[j-1] was
        // already rewritten this pass, so += applies paths = up + left.
        for (let j = 1; j < n; j++) {
            row[j] += row[j - 1];
        }
    }
    return row[n - 1];
}
