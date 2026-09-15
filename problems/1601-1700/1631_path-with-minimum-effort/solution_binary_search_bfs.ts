function minimumEffortPath(heights: number[][]): number {
    const rows = heights.length;
    const cols = heights[0].length;
    // hi = the largest adjacent height difference: no path can force a
    // bigger step. A 1x1 grid has no edges, so hi stays 0 and the loop
    // below never runs.
    let hi = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r + 1 < rows) {
                hi = Math.max(hi, Math.abs(heights[r + 1][c] - heights[r][c]));
            }
            if (c + 1 < cols) {
                hi = Math.max(hi, Math.abs(heights[r][c + 1] - heights[r][c]));
            }
        }
    }
    const dirs: number[][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    const reachable = (cap: number): boolean => {
        const visited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
        visited[0][0] = true;
        const queue: number[][] = [[0, 0]];
        for (let head = 0; head < queue.length; head++) {
            const [r, c] = queue[head];
            if (r === rows - 1 && c === cols - 1) {
                return true;
            }
            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                if (
                    nr >= 0 &&
                    nr < rows &&
                    nc >= 0 &&
                    nc < cols &&
                    !visited[nr][nc] &&
                    // Only steps within the current cap may be crossed.
                    Math.abs(heights[nr][nc] - heights[r][c]) <= cap
                ) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc]);
                }
            }
        }
        return false;
    };
    let lo = 0;
    // Feasibility is monotone in the cap: a path that fits under a cap
    // still fits under any larger one, so binary search applies.
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (reachable(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
