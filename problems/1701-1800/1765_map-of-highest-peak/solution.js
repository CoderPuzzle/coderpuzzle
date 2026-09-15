/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function (isWater) {
    const m = isWater.length,
        n = isWater[0].length;
    // Optimal height = distance to the nearest water: the two rules cap
    // every cell there, and assigning exactly that maximizes all cells at
    // once (neighboring distances differ by at most 1).
    const height = Array.from({ length: m }, () => new Array(n).fill(-1));
    const q = [];
    // Multi-source BFS: every water cell starts at height 0; each BFS ring
    // is one step farther from some water cell.
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (isWater[i][j] === 1) {
                height[i][j] = 0;
                q.push([i, j]);
            }
        }
    }
    let head = 0;
    while (head < q.length) {
        const [i, j] = q[head++];
        for (const [di, dj] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const ni = i + di,
                nj = j + dj;
            // height === -1 doubles as the visited marker, so each cell is
            // enqueued once, by its nearest source.
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && height[ni][nj] === -1) {
                height[ni][nj] = height[i][j] + 1;
                q.push([ni, nj]);
            }
        }
    }
    return height;
};
