function maxEqualRowsAfterFlips(matrix: number[][]): number {
    // column flips XOR one fixed mask onto every row at once, so a row
    // turns uniform iff it equals the mask or its complement: exactly
    // the identical-or-complementary rows can be fixed together
    const counts = new Map<string, number>();
    let best = 0;
    for (const row of matrix) {
        // canonical key: every cell XOR the row's own first cell —
        // identical rows and complementary rows collapse to one key
        const key = row.map((value) => value ^ row[0]).join(",");
        const next = (counts.get(key) || 0) + 1;
        counts.set(key, next);
        best = Math.max(best, next);
    }
    return best;
}
