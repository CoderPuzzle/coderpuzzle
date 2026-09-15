function containsCycle(grid: string[][]): boolean {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    for (let r0 = 0; r0 < rows; r0++) {
        for (let c0 = 0; c0 < cols; c0++) {
            if (visited[r0][c0]) continue;
            visited[r0][c0] = true;
            const stack: number[][] = [[r0, c0, -1, -1]];
            while (stack.length > 0) {
                const [x, y, px, py] = stack.pop()!;
                for (const [dx, dy] of dirs) {
                    const nx = x + dx,
                        ny = y + dy;
                    if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) continue;
                    if (grid[nx][ny] !== grid[x][y]) continue;
                    if (nx === px && ny === py) continue;
                    if (visited[nx][ny]) return true;
                    visited[nx][ny] = true;
                    stack.push([nx, ny, x, y]);
                }
            }
        }
    }
    return false;
}
