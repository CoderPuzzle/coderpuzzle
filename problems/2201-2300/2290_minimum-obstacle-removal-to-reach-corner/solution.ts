function minimumObstacles(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const INF = Infinity;
    const dist: number[][] = Array.from({ length: m }, () => new Array(n).fill(INF));
    dist[0][0] = 0;
    // Deque via two stacks (amortized O(1) push/pop on both ends).
    let left: [number, number][] = [];
    let right: [number, number][] = [];
    const pushLeft = (x: [number, number]) => left.push(x);
    const pushRight = (x: [number, number]) => right.push(x);
    const popLeft = (): [number, number] => {
        if (left.length === 0) {
            left = right.reverse();
            right = [];
        }
        return left.pop()!;
    };
    pushRight([0, 0]);
    const dirs: [number, number][] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    while (left.length || right.length) {
        const [i, j] = popLeft();
        // A popped cell is already final: the deque's distances are
        // non-decreasing, which is what replaces a priority queue.
        const d = dist[i][j];
        for (const [di, dj] of dirs) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                // Edge cost = grid[neighbour]: 1 to clear an obstacle, 0 for
                // a free step, so dist is obstacles removed.
                const nd = d + grid[ni][nj];
                // Relax only on strict improvement — prunes stale entries
                // and bounds how often a cell re-enters.
                if (nd < dist[ni][nj]) {
                    dist[ni][nj] = nd;
                    // 0-1 BFS: free steps go to the front, obstacle steps
                    // to the back, keeping the deque sorted.
                    if (grid[ni][nj] === 0) pushLeft([ni, nj]);
                    else pushRight([ni, nj]);
                }
            }
        }
    }
    return dist[m - 1][n - 1];
}
