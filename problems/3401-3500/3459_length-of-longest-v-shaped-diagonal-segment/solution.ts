function lenOfVDiagonal(grid: number[][]): number {
    const n = grid.length;
    const m = grid[0].length;
    // Diagonal directions in clockwise order NW, NE, SE, SW: a clockwise
    // 90-degree turn maps index d to (d + 1) % 4. Past the head '1' the
    // values alternate 2, 0, 2, 0, ..., so the other expected value of
    // e in {0, 2} is 2 - e.
    const dr = [-1, -1, 1, 1];
    const dc = [-1, 1, 1, -1];
    const inB = (r: number, c: number): boolean => 0 <= r && r < n && 0 <= c && c < m;
    // Straight tables: S[e][d] holds the longest run starting at each cell
    // going straight in direction d when the cell must equal e (0 or 2).
    const S: number[][][][] = [0, 2].map(() =>
        Array.from({ length: 4 }, () => Array.from({ length: n }, () => new Array<number>(m).fill(0))),
    );
    for (let d = 0; d < 4; ++d) {
        // Sweep rows against the direction so the next row is computed.
        for (let i = 0; i < n; ++i) {
            const r = dr[d] < 0 ? i : n - 1 - i;
            for (let c = 0; c < m; ++c) {
                for (let j = 0; j < 2; ++j) {
                    const e = 2 * j;
                    if (grid[r][c] !== e) continue;
                    const nr = r + dr[d];
                    const nc = c + dc[d];
                    const nxt = inB(nr, nc) ? S[1 - j][d][nr][nc] : 0;
                    S[j][d][r][c] = 1 + nxt;
                }
            }
        }
    }
    // One-turn tables: continue straight in direction d, or make the single
    // clockwise turn and hand over to the straight tables of (d + 1) % 4.
    const M: number[][][][] = [0, 2].map(() =>
        Array.from({ length: 4 }, () => Array.from({ length: n }, () => new Array<number>(m).fill(0))),
    );
    for (let d = 0; d < 4; ++d) {
        const cw = (d + 1) % 4;
        for (let i = 0; i < n; ++i) {
            const r = dr[d] < 0 ? i : n - 1 - i;
            for (let c = 0; c < m; ++c) {
                for (let j = 0; j < 2; ++j) {
                    const e = 2 * j;
                    if (grid[r][c] !== e) continue;
                    const nr = r + dr[d];
                    const nc = c + dc[d];
                    const tr = r + dr[cw];
                    const tc = c + dc[cw];
                    let best = inB(nr, nc) ? M[1 - j][d][nr][nc] : 0;
                    if (inB(tr, tc)) best = Math.max(best, S[1 - j][cw][tr][tc]);
                    M[j][d][r][c] = 1 + best;
                }
            }
        }
    }
    // A head '1' plus the best one-turn run over its four first steps.
    let ans = 0;
    for (let r = 0; r < n; ++r) {
        for (let c = 0; c < m; ++c) {
            if (grid[r][c] !== 1) continue;
            let best = 0;
            for (let d = 0; d < 4; ++d) {
                const nr = r + dr[d];
                const nc = c + dc[d];
                if (inB(nr, nc)) best = Math.max(best, M[1][d][nr][nc]);
            }
            ans = Math.max(ans, 1 + best);
        }
    }
    return ans;
}
