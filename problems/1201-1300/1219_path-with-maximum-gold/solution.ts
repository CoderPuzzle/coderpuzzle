function getMaximumGold(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    // Zeroing on entry doubles as the visited mark; restore on exit.
    const walk = (r: number, c: number): number => {
        const gold = grid[r][c];
        grid[r][c] = 0;
        let deepest = 0;
        for (const [nr, nc] of [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1],
        ]) {
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] > 0) {
                deepest = Math.max(deepest, walk(nr, nc));
            }
        }
        grid[r][c] = gold;
        return gold + deepest;
    };
    let best = 0;
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            if (grid[r][c] > 0) best = Math.max(best, walk(r, c));
        }
    }
    return best;
}
