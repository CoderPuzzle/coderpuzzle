/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumMoves = function (grid) {
    // State (r, c, horizontal): (r, c) is the upper-left occupied cell;
    // horizontal snakes occupy (r,c) and (r,c+1), vertical (r,c),(r+1,c).
    const n = grid.length;
    const queue = [[0, 0, 1, 0]];
    const visited = new Set();
    visited.add(0 * n + 0 * 2 + 1);
    for (let head = 0; head < queue.length; ++head) {
        const [r, c, horizontal, moves] = queue[head];
        if (r === n - 1 && c === n - 2 && horizontal === 1) return moves;
        const key = (rr, cc, hh) => (rr * n + cc) * 2 + hh;
        if (horizontal === 1) {
            // Slide right: the new head cell must be empty.
            if (c + 2 < n && grid[r][c + 2] === 0 && !visited.has(key(r, c + 1, 1))) {
                visited.add(key(r, c + 1, 1));
                queue.push([r, c + 1, 1, moves + 1]);
            }
            // Slide down: both cells of the new row must be empty.
            if (r + 1 < n && grid[r + 1][c] === 0 && grid[r + 1][c + 1] === 0 && !visited.has(key(r + 1, c, 1))) {
                visited.add(key(r + 1, c, 1));
                queue.push([r + 1, c, 1, moves + 1]);
            }
            // Rotate clockwise: the two cells under the snake must be empty.
            if (r + 1 < n && grid[r + 1][c] === 0 && grid[r + 1][c + 1] === 0 && !visited.has(key(r, c, 0))) {
                visited.add(key(r, c, 0));
                queue.push([r, c, 0, moves + 1]);
            }
        } else {
            // Slide right: both cells of the new column must be empty.
            if (c + 1 < n && grid[r][c + 1] === 0 && grid[r + 1][c + 1] === 0 && !visited.has(key(r, c + 1, 0))) {
                visited.add(key(r, c + 1, 0));
                queue.push([r, c + 1, 0, moves + 1]);
            }
            // Slide down: the new tail cell must be empty.
            if (r + 2 < n && grid[r + 2][c] === 0 && !visited.has(key(r + 1, c, 0))) {
                visited.add(key(r + 1, c, 0));
                queue.push([r + 1, c, 0, moves + 1]);
            }
            // Rotate counterclockwise: the two cells to the right must be empty.
            if (c + 1 < n && grid[r][c + 1] === 0 && grid[r + 1][c + 1] === 0 && !visited.has(key(r, c, 1))) {
                visited.add(key(r, c, 1));
                queue.push([r, c, 1, moves + 1]);
            }
        }
    }
    return -1;
};
