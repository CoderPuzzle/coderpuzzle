function maximumMinutes(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const INF = 1073741823; // 2^30 - 1, above every reachable time (including 1e9 waits)
    const dirs: number[][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    const targetI = m - 1;
    const targetJ = n - 1;

    // fire spread is independent of where you walk: one multi-source BFS
    // gives fire[i][j] = earliest minute fire occupies each cell
    const fire: number[][] = Array.from({ length: m }, () => new Array(n).fill(INF));
    const queue: number[][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                fire[i][j] = 0;
                queue.push([i, j]);
            }
        }
    }
    for (let head = 0; head < queue.length; head++) {
        const [i, j] = queue[head];
        for (const [di, dj] of dirs) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] !== 2 && fire[ni][nj] === INF) {
                fire[ni][nj] = fire[i][j] + 1;
                queue.push([ni, nj]);
            }
        }
    }

    const canReach = (wait: number): boolean => {
        // the start cell must still be fire-free the moment you set out
        if (wait >= fire[0][0]) {
            return false;
        }
        const seen: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
        seen[0][0] = true;
        const dq: number[][] = [[0, 0, wait]];
        for (let head = 0; head < dq.length; head++) {
            const [i, j, t] = dq[head];
            if (i === targetI && j === targetJ) {
                return true;
            }
            for (const [di, dj] of dirs) {
                const ni = i + di;
                const nj = j + dj;
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] !== 2 && !seen[ni][nj]) {
                    const nt = t + 1;
                    // the safehouse may tie the fire: reaching it the very
                    // minute fire does still counts as escaping
                    if (ni === targetI && nj === targetJ) {
                        if (nt <= fire[ni][nj]) {
                            seen[ni][nj] = true;
                            dq.push([ni, nj, nt]);
                        }
                    } else {
                        // you move, then fire spreads: an ordinary cell is
                        // safe only if fire arrives strictly later than you
                        if (nt < fire[ni][nj]) {
                            seen[ni][nj] = true;
                            dq.push([ni, nj, nt]);
                        }
                    }
                }
            }
        }
        return false;
    };

    // sentinels first: -1 if even waiting 0 fails; the 1e9 sentinel means
    // fire can never pin you down. Survivability is monotone in wait, so
    // binary search the largest survivable wait.
    if (!canReach(0)) {
        return -1;
    }
    if (canReach(1000000000)) {
        return 1000000000;
    }

    let lo = 0;
    let hi = 1000000000;
    while (lo < hi) {
        // upper mid: when survivable, lo moves up to mid without stalling
        const mid = Math.floor((lo + hi + 1) / 2);
        if (canReach(mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo;
}
