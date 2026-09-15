/**
 * @param {string[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    const rows = grid.length;
    if (rows === 0) return 0;
    const cols = grid[0].length;
    const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
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
                const queue = [[r, c]];
                visited[r][c] = true;
                for (let head = 0; head < queue.length; head++) {
                    const [x, y] = queue[head];
                    for (const [dx, dy] of dirs) {
                        const nx = x + dx,
                            ny = y + dy;
                        if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] === "1" && !visited[nx][ny]) {
                            visited[nx][ny] = true;
                            queue.push([nx, ny]);
                        }
                    }
                }
            }
        }
    }
    return count;
};
