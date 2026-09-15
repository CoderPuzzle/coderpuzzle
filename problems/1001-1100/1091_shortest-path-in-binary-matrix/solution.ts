function shortestPathBinaryMatrix(grid: number[][]): number {
    const n = grid.length;
    // Blocked corners admit no path; a 1x1 open grid needs no moves.
    if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) {
        return -1;
    }
    if (n === 1) {
        return 1;
    }
    // Unit-cost moves make BFS optimal: first arrival is a shortest path.
    // dist doubles as the visited marker; length counts cells, so start = 1.
    const dist: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    const queue: Array<[number, number]> = [[0, 0]];
    dist[0][0] = 1;
    let head = 0;
    while (head < queue.length) {
        const [x, y] = queue[head++];
        // Eight-directional neighborhood (diagonals included).
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx,
                    ny = y + dy;
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] === 0 && dist[nx][ny] === 0) {
                    // Early exit the moment the goal becomes reachable.
                    if (nx === n - 1 && ny === n - 1) {
                        return dist[x][y] + 1;
                    }
                    dist[nx][ny] = dist[x][y] + 1;
                    queue.push([nx, ny]);
                }
            }
        }
    }
    // Queue drained without reaching the goal: no clear path.
    return -1;
}
