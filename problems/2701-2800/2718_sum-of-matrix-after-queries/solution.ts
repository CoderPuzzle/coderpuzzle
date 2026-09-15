function matrixSumQueries(n: number, queries: number[][]): number {
    const seenRows = new Array<boolean>(n).fill(false);
    const seenCols = new Array<boolean>(n).fill(false);
    let remainingRows = n;
    let remainingCols = n;
    // Sum reaches n*n*1e5 = 1e13, exact in doubles (< 2^53).
    let total = 0;
    for (let i = queries.length - 1; i >= 0; i--) {
        const [kind, index, value] = queries[i];
        if (kind === 0) {
            if (seenRows[index]) continue;
            seenRows[index] = true;
            remainingRows--;
            total += value * remainingCols;
        } else {
            if (seenCols[index]) continue;
            seenCols[index] = true;
            remainingCols--;
            total += value * remainingRows;
        }
    }
    return total;
}
