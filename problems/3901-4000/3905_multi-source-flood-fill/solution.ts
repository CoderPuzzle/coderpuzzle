function colorGrid(n: number, m: number, sources: number[][]): number[][] {
    const grid: number[][] = Array.from({ length: n }, () => new Array<number>(m).fill(0));
    const dist: number[][] = Array.from({ length: n }, () => new Array<number>(m).fill(-1));
    const queue: number[][] = [];
    for (const [r, c, color] of sources) {
        grid[r][c] = color;
        dist[r][c] = 0;
        queue.push([r, c]);
    }
    const dirs: number[][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    for (let head = 0; head < queue.length; head++) {
        const [i, j] = queue[head];
        const d = dist[i][j];
        for (const [di, dj] of dirs) {
            const ni = i + di,
                nj = j + dj;
            if (0 <= ni && ni < n && 0 <= nj && nj < m) {
                if (dist[ni][nj] === -1) {
                    dist[ni][nj] = d + 1;
                    grid[ni][nj] = grid[i][j];
                    queue.push([ni, nj]);
                } else if (dist[ni][nj] === d + 1) {
                    // reached at the same time step by another color
                    if (grid[i][j] > grid[ni][nj]) {
                        grid[ni][nj] = grid[i][j];
                    }
                }
            }
        }
    }
    return grid;
}
