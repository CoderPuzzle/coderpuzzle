/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
    const rows = heights.length;
    const cols = heights[0].length;
    const INF = Infinity;
    // Bottleneck shortest path: Dijkstra with max in place of addition — a
    // path's effort is the largest height difference along it, and the
    // smallest tentative effort popped is already final.
    const dist = Array.from({ length: rows }, () => new Array(cols).fill(INF));
    dist[0][0] = 0;

    // Min-heap of [d, r, c]
    const heap = [];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                const r = l + 1;
                let m = i;
                if (l < heap.length && heap[l][0] < heap[m][0]) m = l;
                if (r < heap.length && heap[r][0] < heap[m][0]) m = r;
                if (m === i) break;
                [heap[m], heap[i]] = [heap[i], heap[m]];
                i = m;
            }
        }
        return top;
    };

    push([0, 0, 0]);
    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    while (heap.length > 0) {
        const [d, r, c] = pop();
        // The first time the goal is popped its effort is optimal.
        if (r === rows - 1 && c === cols - 1) {
            return d;
        }
        // Stale-entry guard: skip outdated heap records.
        if (d > dist[r][c]) {
            continue;
        }
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const nd = Math.max(d, Math.abs(heights[nr][nc] - heights[r][c]));
                // Relax only when the bottleneck effort strictly improves.
                if (nd < dist[nr][nc]) {
                    dist[nr][nc] = nd;
                    push([nd, nr, nc]);
                }
            }
        }
    }
    return 0;
};
