// Scan row-major for the first island and flood it iteratively to collect
// its cells; then grow a multi-source BFS outward over the water, one layer
// per flipped 0, until the second island is touched. Iterating rather than
// recursing is the point — an island can snake through most of a 100 x 100
// grid, chaining thousands of cells deep, far past any call stack a
// submission is granted.
function shortestBridge(grid: number[][]): number {
    const n = grid.length;
    const seen: boolean[] = new Array(n * n).fill(false);
    // Cells packed as r * n + c in one flat queue, spanning both phases.
    const queue: number[] = new Array(n * n).fill(0);
    let tail = 0;
    let head = 0;
    outer: for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
            if (grid[i][j] === 1) {
                seen[i * n + j] = true;
                queue[tail] = i * n + j;
                tail += 1;
                break outer;
            }
        }
    }
    // A cell is marked when it enters the queue, never when it leaves, so
    // no cell is ever enqueued twice.
    while (head < tail) {
        const cell = queue[head];
        head += 1;
        const r = Math.floor(cell / n);
        const c = cell % n;
        if (r > 0 && grid[r - 1][c] === 1 && !seen[cell - n]) {
            seen[cell - n] = true;
            queue[tail] = cell - n;
            tail += 1;
        }
        if (r + 1 < n && grid[r + 1][c] === 1 && !seen[cell + n]) {
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
    // The flood-filled prefix of the queue is BFS layer 0; each further
    // layer is exactly the set of water cells one more flip away, and the
    // first unvisited land met is island 2.
    let flips = 0;
    head = 0; // replay the island-1 prefix as BFS layer 0
    let layerEnd = tail;
    while (head < layerEnd) {
        let nextEnd = layerEnd;
        while (head < layerEnd) {
            const cell = queue[head];
            head += 1;
            const r = Math.floor(cell / n);
            const c = cell % n;
            if (r > 0 && !seen[cell - n]) {
                if (grid[r - 1][c] === 1) {
                    return flips;
                }
                seen[cell - n] = true;
                queue[nextEnd] = cell - n;
                nextEnd += 1;
            }
            if (r + 1 < n && !seen[cell + n]) {
                if (grid[r + 1][c] === 1) {
                    return flips;
                }
                seen[cell + n] = true;
                queue[nextEnd] = cell + n;
                nextEnd += 1;
            }
            if (c > 0 && !seen[cell - 1]) {
                if (grid[r][c - 1] === 1) {
                    return flips;
                }
                seen[cell - 1] = true;
                queue[nextEnd] = cell - 1;
                nextEnd += 1;
            }
            if (c + 1 < n && !seen[cell + 1]) {
                if (grid[r][c + 1] === 1) {
                    return flips;
                }
                seen[cell + 1] = true;
                queue[nextEnd] = cell + 1;
                nextEnd += 1;
            }
        }
        layerEnd = nextEnd;
        flips += 1;
    }
    return flips;
}
