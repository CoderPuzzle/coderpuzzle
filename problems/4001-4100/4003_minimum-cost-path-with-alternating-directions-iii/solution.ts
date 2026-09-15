function minCost(m: number, n: number, penalty: number[][]): number {
    const INF = Infinity;
    const size = m * n;
    const dist: number[][] = Array.from({ length: size }, () => [INF, INF]);
    dist[0][0] = 1; // entrance cost of (0, 0); next action is odd
    // heap entries: [cost, cell, parity]
    const pq: number[][] = [[1, 0, 0]];
    const cmp = (a: number[], b: number[]): number => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
    const push = (item: number[]): void => {
        pq.push(item);
        let i = pq.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (cmp(pq[p], pq[i]) <= 0) break;
            [pq[p], pq[i]] = [pq[i], pq[p]];
            i = p;
        }
    };
    const pop = (): number[] => {
        const top = pq[0];
        const last = pq.pop()!;
        if (pq.length > 0) {
            pq[0] = last;
            let i = 0;
            for (;;) {
                let smallest = i;
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                if (l < pq.length && cmp(pq[l], pq[smallest]) < 0) smallest = l;
                if (r < pq.length && cmp(pq[r], pq[smallest]) < 0) smallest = r;
                if (smallest === i) break;
                [pq[i], pq[smallest]] = [pq[smallest], pq[i]];
                i = smallest;
            }
        }
        return top;
    };
    const target = size - 1;
    while (pq.length > 0) {
        const [cost, cell, parity] = pop();
        if (cost > dist[cell][parity]) continue;
        if (cell === target) continue;
        const i = Math.floor(cell / n),
            j = cell % n;
        const isOdd = parity === 0;
        const dirs: number[][] = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        for (const [di, dj] of dirs) {
            const ni = i + di,
                nj = j + dj;
            if (!(ni >= 0 && ni < m && nj >= 0 && nj < n)) continue;
            const follows = (isOdd && di + dj > 0) || (!isOdd && di + dj < 0);
            let w = (ni + 1) * (nj + 1);
            if (!follows) w += penalty[i][j];
            const ncell = ni * n + nj;
            const nparity = 1 - parity;
            const nc = cost + w;
            if (nc < dist[ncell][nparity]) {
                dist[ncell][nparity] = nc;
                push([nc, ncell, nparity]);
            }
        }
        // wait flips parity at cost penalty[i][j]
        const w = penalty[i][j];
        const nparity = 1 - parity;
        const nc = cost + w;
        if (nc < dist[cell][nparity]) {
            dist[cell][nparity] = nc;
            push([nc, cell, nparity]);
        }
    }
    return Math.min(dist[target][0], dist[target][1]);
}
