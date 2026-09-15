function shortestDistance(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    // One BFS per building, not per empty cell: each search floods the
    // empty region once, and every empty cell accumulates its distance
    // from that building plus a count of buildings that reached it.
    // Cells are flattened to r * n + c so the sums, counts, and queue are
    // plain arrays.
    const distSum: number[] = new Array<number>(m * n).fill(0);
    const reach: number[] = new Array<number>(m * n).fill(0);
    const moves: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    let buildings = 0;
    for (let br = 0; br < m; ++br) {
        for (let bc = 0; bc < n; ++bc) {
            if (grid[br][bc] !== 1) {
                continue;
            }
            buildings++;
            // BFS starts at the building itself; buildings and obstacles
            // are impassable, so the search only ever walks into empty
            // land and stops where another building blocks the way.
            const step: number[] = new Array<number>(m * n).fill(-1);
            step[br * n + bc] = 0;
            const queue: number[] = [br * n + bc];
            for (let head = 0; head < queue.length; ++head) {
                const pos = queue[head];
                const r = (pos / n) | 0;
                const c = pos % n;
                for (const [dr, dc] of moves) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] !== 0 || step[nr * n + nc] >= 0) {
                        continue;
                    }
                    step[nr * n + nc] = step[pos] + 1;
                    distSum[nr * n + nc] += step[nr * n + nc];
                    reach[nr * n + nc]++;
                    queue.push(nr * n + nc);
                }
            }
        }
    }
    // A house site must reach EVERY building — a cell sealed off from one
    // building is invalid no matter how short its other distances are.
    let best = -1;
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            const pos = r * n + c;
            if (grid[r][c] === 0 && reach[pos] === buildings && (best < 0 || distSum[pos] < best)) {
                best = distSum[pos];
            }
        }
    }
    return best;
}
