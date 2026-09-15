function findMissingAndRepeatedValues(grid: number[][]): number[] {
    // The grid holds [1, n*n] once each except one value twice and one
    // value never: flag each value in a seen array during one pass, and a
    // re-flagged value is the repeated a; the lone unflagged slot afterward
    // is the missing b.
    const n = grid.length;
    const seen = new Array(n * n + 1).fill(false);
    let a = 0;
    for (const row of grid) {
        for (const v of row) {
            if (seen[v]) {
                a = v;
            }
            seen[v] = true;
        }
    }
    let b = 1;
    while (seen[b]) {
        b += 1;
    }
    return [a, b];
}
