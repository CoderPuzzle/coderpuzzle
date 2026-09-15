/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
    const n = grid.length;
    // copy so the input is not mutated; the copy doubles as visited marks
    const g = grid.map((row) => row.slice());
    const queue = [];
    // multi-source BFS: every land cell starts at distance 0, so the first
    // wavefront arrival is exactly each cell's nearest-land distance
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (g[i][j] === 1) queue.push([i, j]);
        }
    }
    // all water (empty seed) or all land: no distance exists
    if (queue.length === 0 || queue.length === n * n) return -1;
    let dist = 0;
    let head = 0;
    while (head < queue.length) {
        // expand one full level per round; dist counts levels processed
        dist += 1;
        const size = queue.length;
        for (let s = head; s < size; s++) {
            const [i, j] = queue[s];
            // 4-directional steps match Manhattan distance on this grid
            for (const [ni, nj] of [
                [i + 1, j],
                [i - 1, j],
                [i, j + 1],
                [i, j - 1],
            ]) {
                if (ni >= 0 && ni < n && nj >= 0 && nj < n && g[ni][nj] === 0) {
                    // flip to 1 on enqueue: each cell is queued once
                    g[ni][nj] = 1;
                    queue.push([ni, nj]);
                }
            }
        }
        head = size;
    }
    // the last round absorbed nothing new, so the deepest level is dist-1
    return dist - 1;
};
