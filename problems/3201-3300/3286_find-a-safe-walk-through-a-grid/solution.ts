function findSafeWalk(grid: number[][], health: number): boolean {
    // A path's cost is the number of unsafe cells it enters, and both
    // endpoints are entered — so grid[0][0] charges immediately. The
    // walk is safe iff some path costs at most health - 1.
    const budget = health - 1;
    const m = grid.length;
    const n = grid[0].length;
    const dist: number[][] = Array.from({ length: m }, () => new Array(n).fill(m * n + 1));
    dist[0][0] = grid[0][0];
    const queue: [number, number][] = [[0, 0]];
    while (queue.length > 0) {
        const [r, c] = queue.shift();
        const d = dist[r][c];
        if (d > budget) {
            continue;
        }
        if (r === m - 1 && c === n - 1) {
            return true;
        }
        for (const [nr, nc] of [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1],
        ]) {
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                continue;
            }
            const nd = d + grid[nr][nc];
            if (nd < dist[nr][nc] && nd <= budget) {
                dist[nr][nc] = nd;
                // Free move joins the current layer; a paid move goes to
                // the back so layers stay ordered.
                if (grid[nr][nc] === 1) {
                    queue.push([nr, nc]);
                } else {
                    queue.unshift([nr, nc]);
                }
            }
        }
    }
    return false;
}
