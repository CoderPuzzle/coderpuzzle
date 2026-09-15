// Flood-fill each island with an explicit queue. The shape is the sorted set
// of cells relative to the first cell the row-major scan meets, so translated
// copies produce one identical signature.
function numDistinctIslands(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const seen: boolean[][] = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
    const shapes = new Set<string>();
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] !== 1 || seen[i][j]) {
                continue;
            }
            seen[i][j] = true;
            const queue: number[][] = [[i, j]];
            const cells: number[][] = [];
            for (let head = 0; head < queue.length; ++head) {
                const [r, c] = queue[head];
                cells.push([r - i, c - j]);
                for (const [dr, dc] of [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1],
                ]) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1 && !seen[nr][nc]) {
                        seen[nr][nc] = true;
                        queue.push([nr, nc]);
                    }
                }
            }
            cells.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
            shapes.add(cells.map((cell) => cell.join(",")).join(";"));
        }
    }
    return shapes.size;
}
