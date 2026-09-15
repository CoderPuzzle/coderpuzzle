function numIslands(grid: string[][]): number {
    const rows = grid.length;
    if (rows === 0) return 0;
    const cols = grid[0].length;
    const visited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "1" && !visited[r][c]) {
                count++;
                const stack: number[][] = [[r, c]];
                visited[r][c] = true;
                while (stack.length > 0) {
                    const [x, y] = stack.pop()!;
                    for (const [dx, dy] of dirs) {
                        const nx = x + dx,
                            ny = y + dy;
                        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] === "1" && !visited[nx][ny]) {
                            visited[nx][ny] = true;
                            stack.push([nx, ny]);
                        }
                    }
                }
            }
        }
    }
    return count;
}
