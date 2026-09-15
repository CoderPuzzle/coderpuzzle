function champagneTower(poured: number, query_row: number, query_glass: number): number {
    // Row-by-row simulation. row[j] is the total champagne glass j of the
    // current row has received; a full glass splits its excess equally
    // between the two glasses below, and rows below query_row never matter.
    let row: number[] = [poured];
    for (let i = 0; i < query_row; ++i) {
        const next: number[] = new Array<number>(row.length + 1).fill(0.0);
        for (let j = 0; j < row.length; ++j) {
            const excess = (row[j] - 1.0) / 2.0;
            if (excess > 0.0) {
                next[j] += excess;
                next[j + 1] += excess;
            }
        }
        row = next;
    }
    return Math.min(1.0, row[query_glass]);
}
