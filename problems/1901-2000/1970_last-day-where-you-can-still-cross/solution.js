/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross = function (row, col, cells) {
    const canCross = (floodedCount) => {
        // Rebuild the grid for this query day: mark the flooded cells as
        // water, then test a top-to-bottom walk by BFS.
        const grid = new Array(row);
        for (let r = 0; r < row; r++) {
            grid[r] = new Array(col).fill(0);
        }
        for (let i = 0; i < floodedCount; i++) {
            grid[cells[i][0] - 1][cells[i][1] - 1] = 1;
        }
        const queue = [];
        const seen = new Array(row);
        for (let r = 0; r < row; r++) {
            seen[r] = new Array(col).fill(false);
        }
        // Multi-source BFS: every unflooded top-row cell is a start.
        for (let c = 0; c < col; c++) {
            if (grid[0][c] === 0) {
                queue.push([0, c]);
                seen[0][c] = true;
            }
        }
        let head = 0;
        while (head < queue.length) {
            const [r, c] = queue[head++];
            if (r === row - 1) return true; // bottom reached: crossing possible
            for (const [dr, dc] of [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
            ]) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < row && nc >= 0 && nc < col && !seen[nr][nc] && grid[nr][nc] === 0) {
                    seen[nr][nc] = true;
                    queue.push([nr, nc]);
                }
            }
        }
        return false;
    };
    // Land only floods, never dries, so crossable days form a prefix of
    // days: binary-search its right endpoint. Day 1 is always crossable.
    let lo = 1;
    let hi = row * col;
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2); // upper mid: last feasible
        if (canCross(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
};
