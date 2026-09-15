function findPath(grid: number[][], k: number): number[][] {
    // Backtrack over the walk, entering waypoint w only as the w-th
    // waypoint. Two prunes keep the 5x5 worst case instant: the remaining
    // cells must still balance by color (the walk strictly alternates
    // colors), and the unvisited region must stay connected.
    const m = grid.length;
    const n = grid[0].length;
    const total = m * n;
    const visited: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
    const remaining = [0, 0]; // cells left, indexed by (row + col) % 2
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            remaining[(r + c) % 2]++;
        }
    }
    const path: number[][] = [];
    const deltas = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    const connected = (): boolean => {
        const cells: number[] = [];
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                if (!visited[r][c]) {
                    cells.push(r * n + c);
                }
            }
        }
        if (cells.length === 0) {
            return true;
        }
        const seen = new Set<number>([cells[0]]);
        const stack = [cells[0]];
        while (stack.length > 0) {
            const flat = stack.pop()!;
            const r = Math.floor(flat / n);
            const c = flat % n;
            for (const [dr, dc] of deltas) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && !seen.has(nr * n + nc)) {
                    seen.add(nr * n + nc);
                    stack.push(nr * n + nc);
                }
            }
        }
        return seen.size === cells.length;
    };
    const dfs = (r: number, c: number, count: number, nxt: number): boolean => {
        const value = grid[r][c];
        if (value !== 0 && value !== nxt) {
            return false;
        }
        visited[r][c] = true;
        path.push([r, c]);
        if (value === nxt) {
            nxt++;
        }
        count++;
        const color = (r + c) % 2;
        remaining[color]--;
        let ok = false;
        if (count === total) {
            ok = true;
        } else {
            const left = total - count;
            // The rest of the walk alternates colors, starting on the
            // opposite color of the current cell.
            if (
                remaining[1 - color] === Math.ceil(left / 2) &&
                remaining[color] === Math.floor(left / 2) &&
                connected()
            ) {
                for (const [dr, dc] of deltas) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && dfs(nr, nc, count, nxt)) {
                        ok = true;
                        break;
                    }
                }
            }
        }
        if (!ok) {
            visited[r][c] = false;
            path.pop();
        }
        remaining[color]++;
        return ok;
    };
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if ((grid[r][c] === 0 || grid[r][c] === 1) && dfs(r, c, 0, 1)) {
                return path;
            }
        }
    }
    return [];
}
