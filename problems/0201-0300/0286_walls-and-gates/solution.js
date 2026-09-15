/**
 * @param {number[][]} rooms
 * @return {number[][]}
 */
var wallsAndGates = function (rooms) {
    const m = rooms.length;
    const n = rooms[0].length;
    const INF = 2147483647;
    // Invert the search: enqueue every gate at once and run one BFS outward,
    // rather than searching from each empty room.
    const queue = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (rooms[r][c] === 0) {
                queue.push([r, c]);
            }
        }
    }
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    let dist = 0;
    while (queue.length) {
        // Expand one whole layer per step: every distance-d cell is found
        // before any d+1 cell is labeled, which is what keeps distances
        // minimal (first reach = shortest path from a gate).
        dist++;
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const [r, c] = queue.shift();
            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                // Still INF means unvisited; writing the distance doubles as
                // the visited mark, and walls/gates never match INF so they
                // are never entered or overwritten.
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] === INF) {
                    rooms[nr][nc] = dist;
                    queue.push([nr, nc]);
                }
            }
        }
    }
    return rooms;
};
