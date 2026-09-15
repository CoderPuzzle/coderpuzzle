/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    // Sweep row-major: every island is discovered exactly once, at the
    // first cell the scan meets, and counted by flooding it with an
    // explicit queue. Iterating rather than recursing is the point — a
    // snake-shaped island at the bound chains thousands of cells deep,
    // far past any call stack a submission is granted.
    const m = grid.length;
    const n = grid[0].length;
    const seen = new Array(m * n).fill(false);
    // Cells packed as r * n + c in one flat queue, reused per island.
    const queue = new Array(m * n).fill(0);
    let best = 0;
    for (let i = 0; i < m; i += 1) {
        for (let j = 0; j < n; j += 1) {
            if (grid[i][j] !== 1 || seen[i * n + j]) {
                continue;
            }
            seen[i * n + j] = true;
            let tail = 0;
            let head = 0;
            queue[tail] = i * n + j;
            tail += 1;
            let area = 0;
            // A cell is marked when it enters the queue, never when it
            // leaves, so no cell is ever enqueued twice.
            while (head < tail) {
                const cell = queue[head];
                head += 1;
                const r = Math.floor(cell / n);
                const c = cell % n;
                area += 1;
                if (r > 0 && grid[r - 1][c] === 1 && !seen[cell - n]) {
                    seen[cell - n] = true;
                    queue[tail] = cell - n;
                    tail += 1;
                }
                if (r + 1 < m && grid[r + 1][c] === 1 && !seen[cell + n]) {
                    seen[cell + n] = true;
                    queue[tail] = cell + n;
                    tail += 1;
                }
                if (c > 0 && grid[r][c - 1] === 1 && !seen[cell - 1]) {
                    seen[cell - 1] = true;
                    queue[tail] = cell - 1;
                    tail += 1;
                }
                if (c + 1 < n && grid[r][c + 1] === 1 && !seen[cell + 1]) {
                    seen[cell + 1] = true;
                    queue[tail] = cell + 1;
                    tail += 1;
                }
            }
            best = Math.max(best, area);
        }
    }
    return best;
};
