function findSafeWalk(grid: number[][], health: number): boolean {
    // A path's cost is the number of unsafe cells it enters, and both
    // endpoints are entered — so grid[0][0] charges immediately. The
    // walk is safe iff some path costs at most health - 1.
    const budget = health - 1;
    const m = grid.length;
    const n = grid[0].length;
    const dist: number[][] = Array.from({ length: m }, () => new Array(n).fill(m * n + 1));
    dist[0][0] = grid[0][0];

    // Min-heap of [d, r, c]
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

    push([grid[0][0], 0, 0]);
    while (heap.length > 0) {
        const [d, r, c] = pop();
        // The first time the goal is popped its cost is optimal.
        if (r === m - 1 && c === n - 1) {
            return d <= budget;
        }
        // Stale-entry guard: skip outdated heap records.
        if (d > dist[r][c]) {
            continue;
        }
        for (const [nr, nc] of [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1],
        ]) {
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                continue;
            }
            const nd = d + grid[nr][nc];
            // Relax only when the unsafe count strictly improves.
            if (nd < dist[nr][nc]) {
                dist[nr][nc] = nd;
                push([nd, nr, nc]);
            }
        }
    }
    return false;
}
