/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumTime = function (grid) {
    const m = grid.length;
    const n = grid[0].length;
    if (m === 1 && n === 1) {
        return 0;
    }
    // If both neighbours of the start cell demand more than 1s we can never
    // leave the start (no adjacent cell to wait on).
    const canRight = n > 1 && grid[0][1] <= 1;
    const canDown = m > 1 && grid[1][0] <= 1;
    if (!canRight && !canDown) {
        return -1;
    }

    const INF = Infinity;
    const dist = Array.from({ length: m }, () => new Array(n).fill(INF));
    dist[0][0] = 0;

    // binary min-heap of [t, r, c]
    const heap = [];
    const less = (a, b) => a[0] < b[0];
    const push = (item) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (less(heap[i], heap[p])) {
                const tmp = heap[i];
                heap[i] = heap[p];
                heap[p] = tmp;
                i = p;
            } else {
                break;
            }
        }
    };
    const pop = () => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                let smallest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                if (l < heap.length && less(heap[l], heap[smallest])) {
                    smallest = l;
                }
                if (r < heap.length && less(heap[r], heap[smallest])) {
                    smallest = r;
                }
                if (smallest === i) {
                    break;
                }
                const tmp = heap[i];
                heap[i] = heap[smallest];
                heap[smallest] = tmp;
                i = smallest;
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
        const [t, r, c] = pop();
        if (t !== dist[r][c]) {
            continue;
        }
        if (r === m - 1 && c === n - 1) {
            return t;
        }
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                continue;
            }
            let nt = t + 1;
            if (nt < grid[nr][nc]) {
                if ((grid[nr][nc] - nt) % 2 === 0) {
                    nt = grid[nr][nc];
                } else {
                    nt = grid[nr][nc] + 1;
                }
            }
            if (nt < dist[nr][nc]) {
                dist[nr][nc] = nt;
                push([nt, nr, nc]);
            }
        }
    }
    return -1;
};
