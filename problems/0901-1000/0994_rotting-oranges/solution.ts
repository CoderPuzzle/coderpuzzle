function orangesRotting(grid: number[][]): number {
    const g = grid.map((row) => row.slice());
    const rows = g.length;
    const cols = g[0].length;
    const queue: Array<[number, number, number]> = [];
    let fresh = 0;
    // Multi-source BFS: every rotten orange starts at t = 0; the answer
    // is the time the last fresh orange rots. Count fresh cells so
    // walled-off stragglers can be detected at the end.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (g[r][c] === 2) {
                queue.push([r, c, 0]);
            } else if (g[r][c] === 1) {
                fresh++;
            }
        }
    }
    let minutes = 0;
    let head = 0;
    while (head < queue.length) {
        const [r, c, t] = queue[head++];
        // Tracking the max infection time spares per-minute batching.
        if (t > minutes) {
            minutes = t;
        }
        for (const [dr, dc] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ] as Array<[number, number]>) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] === 1) {
                // Flip to rotten on enqueue: each cell queues at most
                // once and `fresh` stays in sync with the grid.
                g[nr][nc] = 2;
                fresh--;
                queue.push([nr, nc, t + 1]);
            }
        }
    }
    return fresh === 0 ? minutes : -1;
}
