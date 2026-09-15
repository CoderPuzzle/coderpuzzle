/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
    // A qualifying walk steps on every non-obstacle square exactly once
    // and reaches the ending square last — a Hamiltonian path of the
    // walkable squares, counted by walking every candidate. m * n is at
    // most 20, so one integer is the visited set: bit r * n + c. The
    // scan finds the start and builds `full`, the mask of every
    // walkable square; a walk counts exactly when it steps onto the
    // ending square with mask == full.
    const m = grid.length;
    const n = grid[0].length;
    let full = 0;
    let startR = 0;
    let startC = 0;
    for (let i = 0; i < m; i += 1) {
        for (let j = 0; j < n; j += 1) {
            if (grid[i][j] !== -1) {
                full |= 1 << (i * n + j);
            }
            if (grid[i][j] === 1) {
                startR = i;
                startC = j;
            }
        }
    }
    const steps = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    function dfs(r, c, mask) {
        // No square may be walked twice, so meeting the ending square ends
        // the walk whether or not it is complete.
        if (grid[r][c] === 2) {
            return mask === full ? 1 : 0;
        }
        let paths = 0;
        for (const step of steps) {
            const nr = r + step[0];
            const nc = c + step[1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] === -1) {
                continue;
            }
            const bit = 1 << (nr * n + nc);
            if ((mask & bit) === 0) {
                paths += dfs(nr, nc, mask | bit);
            }
        }
        return paths;
    }

    return dfs(startR, startC, 1 << (startR * n + startC));
};
