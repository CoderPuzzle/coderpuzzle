function findMaxFish(grid: number[][]): number {
    // Every unvisited water cell seeds one flood fill that totals the fish
    // of its connected component; the best component total wins.
    const rows = grid.length;
    const columns = grid[0].length;
    const visited: boolean[][] = Array.from({ length: rows }, () => new Array(columns).fill(false));
    let best = 0;
    for (let startR = 0; startR < rows; startR++) {
        for (let startC = 0; startC < columns; startC++) {
            if (grid[startR][startC] === 0 || visited[startR][startC]) {
                continue;
            }
            visited[startR][startC] = true;
            const stack: number[][] = [[startR, startC]];
            let total = 0;
            while (stack.length > 0) {
                const [r, c] = stack.pop()!;
                total += grid[r][c];
                for (const [nr, nc] of [
                    [r + 1, c],
                    [r - 1, c],
                    [r, c + 1],
                    [r, c - 1],
                ]) {
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] > 0 && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        stack.push([nr, nc]);
                    }
                }
            }
            best = Math.max(best, total);
        }
    }
    return best;
}
