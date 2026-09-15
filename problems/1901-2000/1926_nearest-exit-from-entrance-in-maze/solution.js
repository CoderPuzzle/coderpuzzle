/**
 * @param {string[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function (maze, entrance) {
    const m = maze.length,
        n = maze[0].length;
    const er = entrance[0],
        ec = entrance[1];
    // Every move costs one step, so plain BFS from the entrance visits cells
    // in order of increasing distance; dist doubles as the visited set (-1).
    const dist = Array.from({ length: m }, () => new Array(n).fill(-1));
    dist[er][ec] = 0;
    const q = [[er, ec]];
    let head = 0;
    while (head < q.length) {
        const [i, j] = q[head++];
        // Test on pop, not push: cleanly skips the entrance itself while
        // returning the correct distance for any other border cell.
        if ((i === 0 || i === m - 1 || j === 0 || j === n - 1) && !(i === er && j === ec)) {
            return dist[i][j];
        }
        for (const [di, dj] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && maze[ni][nj] === "." && dist[ni][nj] === -1) {
                // Assigning distance at enqueue time keeps the queue ordered
                // by distance.
                dist[ni][nj] = dist[i][j] + 1;
                q.push([ni, nj]);
            }
        }
    }
    // Queue drained without dequeuing any exit: no reachable exit exists.
    return -1;
};
