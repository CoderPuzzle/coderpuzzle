/**
 * @param {number[][]} grid
 * @return {number}
 */
var sumRemoteness = function (grid) {
    // One flood fill per unvisited non-blocked cell totals the size and
    // value of its component; a cell reaches exactly its own component,
    // so its remoteness is every other component's value, and summing
    // that over all cells collapses to size * (total - component_sum).
    // Totals stay below n^4 * 10^6 < 8.1e15, safely inside exact doubles.
    const rows = grid.length;
    const columns = grid[0].length;
    const visited = Array.from({ length: rows }, () => new Array(columns).fill(false));
    let total = 0;
    const components = [];
    for (let startR = 0; startR < rows; startR++) {
        for (let startC = 0; startC < columns; startC++) {
            if (grid[startR][startC] === -1 || visited[startR][startC]) {
                continue;
            }
            visited[startR][startC] = true;
            const stack = [[startR, startC]];
            let size = 0;
            let values = 0;
            while (stack.length > 0) {
                const [r, c] = stack.pop();
                size++;
                values += grid[r][c];
                for (const [nr, nc] of [
                    [r + 1, c],
                    [r - 1, c],
                    [r, c + 1],
                    [r, c - 1],
                ]) {
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] !== -1 && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        stack.push([nr, nc]);
                    }
                }
            }
            total += values;
            components.push([size, values]);
        }
    }
    let answer = 0;
    for (const [size, values] of components) {
        answer += size * (total - values);
    }
    return answer;
};
