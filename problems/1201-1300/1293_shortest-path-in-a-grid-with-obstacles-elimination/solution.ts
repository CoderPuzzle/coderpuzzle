function shortestPath(grid: number[][], k: number): number {
    const m = grid.length,
        n = grid[0].length;
    if (k >= m + n - 2) {
        return m + n - 2;
    }
    const seen = new Set<number>();
    const queue: number[][] = [[0, 0, k]];
    seen.add(k);
    let head = 0;
    let steps = 0;
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    while (head < queue.length) {
        const levelEnd = queue.length;
        while (head < levelEnd) {
            const [x, y, remaining] = queue[head++];
            if (x === m - 1 && y === n - 1) {
                return steps;
            }
            for (const [dx, dy] of dirs) {
                const nx = x + dx,
                    ny = y + dy;
                if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                    const nr = remaining - grid[nx][ny];
                    if (nr >= 0) {
                        const key = (nx * n + ny) * (k + 1) + nr;
                        if (!seen.has(key)) {
                            seen.add(key);
                            queue.push([nx, ny, nr]);
                        }
                    }
                }
            }
        }
        steps++;
    }
    return -1;
}
