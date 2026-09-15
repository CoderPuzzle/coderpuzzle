/**
 * @param {string[][]} grid
 * @return {number}
 */
var getFood = function (grid) {
    const m = grid.length,
        n = grid[0].length;
    let start = null;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === "*") start = [i, j];
        }
    }
    const dist = Array.from({ length: m }, () => new Array(n).fill(-1));
    dist[start[0]][start[1]] = 0;
    const q = [start];
    let head = 0;
    while (head < q.length) {
        const [i, j] = q[head++];
        if (grid[i][j] === "#") return dist[i][j];
        for (const [di, dj] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] !== "X" && dist[ni][nj] === -1) {
                dist[ni][nj] = dist[i][j] + 1;
                q.push([ni, nj]);
            }
        }
    }
    return -1;
};
