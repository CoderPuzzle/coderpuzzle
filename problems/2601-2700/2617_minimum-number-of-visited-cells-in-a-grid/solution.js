/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumVisitedCells = function (grid) {
    // Every move goes strictly right or down, so row-major order is a
    // topological order: when a cell is reached its distance is final.
    // Two lazy min-heaps answer "nearest predecessor" in O(log n):
    // rows[i] holds [dis, k] for cells settled in row i and cols[j]
    // likewise down column j. Entries whose reach no longer covers the
    // current index pop forever — the scan index only ever grows — so
    // the surviving root is the best available source from that side.
    const m = grid.length;
    const n = grid[0].length;
    const infinity = Number.MAX_SAFE_INTEGER;
    const dis = Array.from({ length: m }, () => new Array(n).fill(infinity));
    dis[0][0] = 1;
    const rows = Array.from({ length: m }, () => []);
    const cols = Array.from({ length: n }, () => []);
    const push = (heap, dis, index) => {
        heap.push([dis, index]);
        let child = heap.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (heap[parent][0] <= heap[child][0]) break;
            [heap[parent], heap[child]] = [heap[child], heap[parent]];
            child = parent;
        }
    };
    const popStale = (heap, reach, limit) => {
        while (heap.length && reach(heap[0][1]) < limit) {
            heap[0] = heap[heap.length - 1];
            heap.pop();
            let parent = 0;
            for (;;) {
                const left = parent * 2 + 1;
                const right = left + 1;
                let best = parent;
                if (left < heap.length && heap[left][0] < heap[best][0]) best = left;
                if (right < heap.length && heap[right][0] < heap[best][0]) best = right;
                if (best === parent) break;
                [heap[parent], heap[best]] = [heap[best], heap[parent]];
                parent = best;
            }
        }
    };
    push(rows[0], 1, 0);
    push(cols[0], 1, 0);
    for (let i = 0; i < m; i++) {
        const grow = grid[i];
        for (let j = 0; j < n; j++) {
            if (!i && !j) continue;
            popStale(rows[i], (k) => grow[k] + k, j);
            popStale(cols[j], (k) => grid[k][j] + k, i);
            const leftReach = rows[i].length ? rows[i][0][0] : infinity;
            const upReach = cols[j].length ? cols[j][0][0] : infinity;
            const nearest = Math.min(leftReach, upReach);
            if (nearest < infinity) {
                dis[i][j] = nearest + 1;
                push(rows[i], nearest + 1, j);
                push(cols[j], nearest + 1, i);
            }
        }
    }
    const last = dis[m - 1][n - 1];
    return last < infinity ? last : -1;
};
