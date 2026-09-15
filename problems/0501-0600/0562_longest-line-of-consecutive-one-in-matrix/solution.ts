function longestLine(mat: number[][]): number {
    // Scan row by row; prev[j] holds the four run lengths that end at
    // cell (i - 1, j): horizontal, vertical, diagonal, anti-diagonal.
    const m = mat.length;
    const n = mat[0].length;
    let prev: number[][] = Array.from({ length: n }, () => [0, 0, 0, 0]);
    let best = 0;
    for (let i = 0; i < m; ++i) {
        const cur: number[][] = Array.from({ length: n }, () => [0, 0, 0, 0]);
        for (let j = 0; j < n; ++j) {
            if (mat[i][j] === 1) {
                // Horizontal: extend the run arriving from the left.
                cur[j][0] = (j > 0 ? cur[j - 1][0] : 0) + 1;
                // Vertical: extend the run arriving from above.
                cur[j][1] = prev[j][1] + 1;
                // Diagonal: extend the run arriving from up-left.
                cur[j][2] = (j > 0 ? prev[j - 1][2] : 0) + 1;
                // Anti-diagonal: extend the run arriving from up-right.
                cur[j][3] = (j + 1 < n ? prev[j + 1][3] : 0) + 1;
                for (const run of cur[j]) {
                    if (run > best) {
                        best = run;
                    }
                }
            }
        }
        prev = cur;
    }
    return best;
}
