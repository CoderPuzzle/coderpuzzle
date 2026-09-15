/**
 * @param {number} n
 * @param {number} m
 * @param {number[][]} sources
 * @return {number[][]}
 */
var colorGrid = function (n, m, sources) {
    const grid = Array.from({ length: n }, () => new Array(m).fill(0));
    const dist = Array.from({ length: n }, () => new Array(m).fill(-1));
    const queue = [];
    for (const [r, c, color] of sources) {
        grid[r][c] = color;
        dist[r][c] = 0;
        queue.push([r, c]);
    }
    for (let head = 0; head < queue.length; head++) {
        const [i, j] = queue[head];
        const d = dist[i][j];
        for (const [di, dj] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
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
};
