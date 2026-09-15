function oddCells(m: number, n: number, indices: number[][]): number {
    const rowOdd: boolean[] = new Array(m).fill(false);
    const colOdd: boolean[] = new Array(n).fill(false);
    for (const [r, c] of indices) {
        // Only parity survives; the cell value is row count + column count.
        rowOdd[r] = !rowOdd[r];
        colOdd[c] = !colOdd[c];
    }
    const count = (arr: boolean[]) => arr.reduce((acc, b) => acc + (b ? 1 : 0), 0);
    const oddRows = count(rowOdd);
    const oddCols = count(colOdd);
    return oddRows * (n - oddCols) + (m - oddRows) * oddCols;
}
