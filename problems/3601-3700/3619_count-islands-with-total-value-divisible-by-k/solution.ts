function countIslands(grid: number[][], k: number): number {
    const m = grid.length;
    const n = grid[0].length;
    const seen: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
    // Iterative BFS: an island can span all 1e5 cells, so no recursion.
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    let count = 0;
    for (let si = 0; si < m; ++si) {
        for (let sj = 0; sj < n; ++sj) {
            if (grid[si][sj] === 0 || seen[si][sj]) continue;
            // An island total reaches 1e5 cells * 1e6 = 1e11 < 2^53, so a
            // Number stays exact for the sum.
            let total = 0;
            const queue = [si * n + sj];
            seen[si][sj] = true;
            for (let head = 0; head < queue.length; ++head) {
                const cell = queue[head];
                const x = Math.floor(cell / n);
                const y = cell % n;
                total += grid[x][y];
                for (let d = 0; d < 4; ++d) {
                    const nx = x + dx[d];
                    const ny = y + dy[d];
                    if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
                    if (grid[nx][ny] === 0 || seen[nx][ny]) continue;
                    seen[nx][ny] = true;
                    queue.push(nx * n + ny);
                }
            }
            if (total % k === 0) ++count;
        }
    }
    return count;
}
