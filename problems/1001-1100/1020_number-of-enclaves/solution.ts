function numEnclaves(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    // Iterative BFS (explicit queue, not recursion) starting from every
    // land cell already sitting on the boundary: that land can trivially
    // walk off the grid, and so can every land cell it can reach.
    const queue: [number, number][] = [];
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            const onBoundary = r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
            if (onBoundary && grid[r][c] === 1) {
                queue.push([r, c]);
                grid[r][c] = 0;
            }
        }
    }

    const directions: [number, number][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    let head = 0;
    while (head < queue.length) {
        const [r, c] = queue[head++];
        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                grid[nr][nc] = 0;
                queue.push([nr, nc]);
            }
        }
    }

    // Whatever land the fill never reached could never walk off the grid:
    // that's exactly the enclosed count.
    let count = 0;
    for (const row of grid) {
        for (const cell of row) {
            count += cell;
        }
    }
    return count;
}
