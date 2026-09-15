function maxIncreasingCells(mat: number[][]): number {
    // Chains only ever move to strictly greater values, so sweeping the
    // distinct values in ascending order lets every cell inherit the best
    // chain that already ends in its row or column among smaller values.
    // Cells sharing one value form a read-then-write batch: their answers
    // come from the row/column state before the batch, and the maxima
    // absorb the whole batch afterwards, since an equal-value cell can
    // never continue a chain.
    const rows = mat.length;
    const cols = mat[0].length;
    const cells: Array<[number, number, number]> = [];
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            cells.push([mat[r][c], r, c]);
        }
    }
    cells.sort((p, q) => p[0] - q[0]);
    const rowMax = new Array(rows).fill(0);
    const colMax = new Array(cols).fill(0);
    let best = 0;
    let i = 0;
    while (i < cells.length) {
        let j = i; // run-length batch equal values: equal cells never chain
        while (j < cells.length && cells[j][0] === cells[i][0]) {
            ++j;
        }
        const batch: Array<[number, number, number]> = [];
        for (let k = i; k < j; ++k) {
            const r = cells[k][1];
            const c = cells[k][2];
            // one more than the best chain ending at a strictly smaller value
            const length = Math.max(rowMax[r], colMax[c]) + 1;
            batch.push([length, r, c]);
            if (best < length) {
                best = length;
            }
        }
        for (const [length, r, c] of batch) {
            if (rowMax[r] < length) {
                rowMax[r] = length;
            }
            if (colMax[c] < length) {
                colMax[c] = length;
            }
        }
        i = j;
    }
    return best;
}
