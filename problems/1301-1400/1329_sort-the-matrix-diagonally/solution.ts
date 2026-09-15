function diagonalSort(mat: number[][]): number[][] {
    // Cells on one diagonal share i - j, so sort each diagonal from its
    // top-row / left-column start and write the values back along the walk.
    const m = mat.length;
    const n = mat[0].length;
    const out: number[][] = Array.from({ length: m }, () => new Array<number>(n).fill(0));
    const starts: Array<[number, number]> = [];
    for (let j = 0; j < n; ++j) starts.push([0, j]);
    for (let i = 1; i < m; ++i) starts.push([i, 0]);
    for (const [si, sj] of starts) {
        const diag: number[] = [];
        for (let i = si, j = sj; i < m && j < n; ++i, ++j) diag.push(mat[i][j]);
        diag.sort((a, b) => a - b);
        let k = 0;
        for (let i = si, j = sj; i < m && j < n; ++i, ++j) out[i][j] = diag[k++];
    }
    return out;
}
