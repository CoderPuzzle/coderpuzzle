function minCost(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const di = [0, 0, 1, -1];
    const dj = [1, -1, 0, 0];
    const INF = Infinity;
    const dist: number[][] = [];
    for (let i = 0; i < m; i++) {
        dist.push(new Array(n).fill(INF));
    }
    dist[0][0] = 0;
    // Shortest path over cells: following the sign costs 0, any other move
    // costs 1 (the price of rewriting it). Plain Dijkstra: a binary heap
    // yields the smallest tentative distance on every pop, whatever the
    // weights are.
    // Min-heap of [d, i, j]
    const heap: number[][] = [];
    const push = (item: number[]): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= heap[i][0]) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number[] => {
        const top = heap[0];
        const last = heap.pop() as number[];
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                const r = l + 1;
                let min = i;
                if (l < heap.length && heap[l][0] < heap[min][0]) min = l;
                if (r < heap.length && heap[r][0] < heap[min][0]) min = r;
                if (min === i) break;
                [heap[min], heap[i]] = [heap[i], heap[min]];
                i = min;
            }
        }
        return top;
    };

    push([0, 0, 0]);
    while (heap.length > 0) {
        const [d, i, j] = pop();
        // The first pop of a cell settles its distance for good.
        if (i === m - 1 && j === n - 1) {
            return d;
        }
        // Stale-entry guard: skip outdated heap records.
        if (d > dist[i][j]) {
            continue;
        }
        for (let s = 1; s <= 4; s++) {
            const ni = i + di[s - 1];
            const nj = j + dj[s - 1];
            // Bounds check drops signs pointing off the grid.
            if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                const cost = grid[i][j] === s ? 0 : 1;
                // Relax only when the rewrite price strictly improves.
                if (d + cost < dist[ni][nj]) {
                    dist[ni][nj] = d + cost;
                    push([d + cost, ni, nj]);
                }
            }
        }
    }
    return dist[m - 1][n - 1];
}
