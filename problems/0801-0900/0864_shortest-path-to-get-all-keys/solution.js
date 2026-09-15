/**
 * @param {string[]} grid
 * @return {number}
 */
var shortestPathAllKeys = function (grid) {
    const m = grid.length;
    const n = grid[0].length;
    let start = null;
    let target = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const ch = grid[i][j];
            if (ch === "@") {
                start = [i, j];
            } else if (ch >= "a" && ch <= "f") {
                target |= 1 << (ch.charCodeAt(0) - 97);
            }
        }
    }
    const size = 1 << 6;
    const dist = new Array(m * n * size).fill(-1);
    const queue = [];
    const sIdx = (start[0] * n + start[1]) * size;
    dist[sIdx] = 0;
    queue.push([start[0], start[1], 0]);
    let head = 0;
    while (head < queue.length) {
        const [r, c, mask] = queue[head++];
        if (mask === target) {
            return dist[(r * n + c) * size + mask];
        }
        const d = dist[(r * n + c) * size + mask];
        const dirs = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                continue;
            }
            const ch = grid[nr][nc];
            if (ch === "#") {
                continue;
            }
            if (ch >= "A" && ch <= "F" && !(mask & (1 << (ch.charCodeAt(0) - 65)))) {
                continue;
            }
            let nmask = mask;
            if (ch >= "a" && ch <= "f") {
                nmask |= 1 << (ch.charCodeAt(0) - 97);
            }
            const idx = (nr * n + nc) * size + nmask;
            if (dist[idx] === -1) {
                dist[idx] = d + 1;
                queue.push([nr, nc, nmask]);
            }
        }
    }
    return -1;
};
