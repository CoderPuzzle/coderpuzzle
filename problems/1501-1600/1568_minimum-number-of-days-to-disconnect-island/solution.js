/**
 * @param {number[][]} grid
 * @return {number}
 */
var minDays = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    const islandCount = () => {
        const seen = Array.from({ length: rows }, () => Array(cols).fill(false));
        let count = 0;
        const dirs = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 1 && !seen[r][c]) {
                    count++;
                    const stack = [[r, c]];
                    seen[r][c] = true;
                    while (stack.length > 0) {
                        const [cr, cc] = stack.pop();
                        for (const [dr, dc] of dirs) {
                            const nr = cr + dr;
                            const nc = cc + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1 && !seen[nr][nc]) {
                                seen[nr][nc] = true;
                                stack.push([nr, nc]);
                            }
                        }
                    }
                }
            }
        }
        return count;
    };

    if (islandCount() !== 1) {
        return 0;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                grid[r][c] = 0;
                const disconnected = islandCount() !== 1;
                grid[r][c] = 1;
                if (disconnected) {
                    return 1;
                }
            }
        }
    }

    return 2;
};
