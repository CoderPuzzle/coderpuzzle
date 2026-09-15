function minimumTotal(triangle: number[][]): number {
    // Top-down mirror of the bottom-up DP: best[i] = minimum path sum from
    // the apex down to column i of the current row.
    let best: number[] = [triangle[0][0]];
    for (const row of triangle.slice(1)) {
        // A cell descends from column i-1 or i of the row above, so both
        // ragged edge cells have a single parent.
        const nxt: number[] = [row[0] + best[0]];
        for (let i = 1; i < row.length - 1; i++) {
            nxt.push(row[i] + Math.min(best[i - 1], best[i]));
        }
        nxt.push(row[row.length - 1] + best[best.length - 1]);
        best = nxt;
    }
    // The answer is the cheapest cell on the final row.
    return Math.min(...best);
}
