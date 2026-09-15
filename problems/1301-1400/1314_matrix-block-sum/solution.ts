function matrixBlockSum(mat: number[][], k: number): number[][] {
    const m = mat.length,
        n = mat[0].length;
    // prefix[i+1][j+1] = sum of the rectangle (0,0)..(i,j); the extra zero
    // row and column remove all boundary special-casing.
    const prefix: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // Two-dimensional inclusion-exclusion: add above + left,
            // subtract the doubly-counted corner, add the cell.
            prefix[i + 1][j + 1] = prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j] + mat[i][j];
        }
    }
    const answer: number[][] = [];
    for (let i = 0; i < m; i++) {
        const row: number[] = [];
        for (let j = 0; j < n; j++) {
            // Clamp the (i-k..i+k) window to the grid and convert it to
            // the half-open [r1,r2) x [c1,c2) form the table supports —
            // border cells just query a smaller rectangle.
            const r1 = Math.max(0, i - k),
                r2 = Math.min(m, i + k + 1);
            const c1 = Math.max(0, j - k),
                c2 = Math.min(n, j + k + 1);
            // Four lookups with alternating signs: O(1) for any k.
            row.push(prefix[r2][c2] - prefix[r1][c2] - prefix[r2][c1] + prefix[r1][c1]);
        }
        answer.push(row);
    }
    return answer;
}
