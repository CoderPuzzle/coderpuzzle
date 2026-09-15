/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var hasValidPath = function (grid) {
    // Each street type is the set of sides it opens. A move between
    // neighbouring cells is legal only when the source opens the shared
    // side AND the target opens the opposite side, so a plain BFS from
    // (0,0) over those mutual connections decides reachability.
    const streetSides = { 1: [0, 1], 2: [2, 3], 3: [0, 3], 4: [1, 3], 5: [0, 2], 6: [1, 2] };
    const step = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];
    const opposite = [1, 0, 3, 2];
    const m = grid.length;
    const n = grid[0].length;
    const visited = Array.from({ length: m }, () => new Array(n).fill(false));
    const queue = [[0, 0]];
    visited[0][0] = true;
    for (let head = 0; head < queue.length; ++head) {
        const [row, col] = queue[head];
        if (row === m - 1 && col === n - 1) {
            return true;
        }
        for (const side of streetSides[grid[row][col]]) {
            const nr = row + step[side][0];
            const nc = col + step[side][1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
                continue;
            }
            if (streetSides[grid[nr][nc]].includes(opposite[side])) {
                visited[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }
    return false;
};
