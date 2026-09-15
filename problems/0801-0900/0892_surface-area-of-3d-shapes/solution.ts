// Every exposed face belongs to some tower: an occupied cell owns a top and
// a bottom face, and each of its four walls shows exactly the strip rising
// above the neighboring cell (empty ground or the grid's edge is a neighbor
// of height 0).
function surfaceArea(grid: number[][]): number {
    const n = grid.length;
    let total = 0;
    const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            const v = grid[i][j];
            if (v > 0) {
                total += 2;
                for (const [di, dj] of dirs) {
                    const ni = i + di;
                    const nj = j + dj;
                    const neighbor = ni >= 0 && ni < n && nj >= 0 && nj < n ? grid[ni][nj] : 0;
                    if (v > neighbor) {
                        total += v - neighbor;
                    }
                }
            }
        }
    }
    return total;
}
