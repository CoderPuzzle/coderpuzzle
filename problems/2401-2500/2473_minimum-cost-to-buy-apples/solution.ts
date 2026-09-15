function minCost(n: number, roads: number[][], appleCost: number[], k: number): number[] {
    const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
    for (const [a, b, c] of roads) {
        adj[a].push([b, c]);
        adj[b].push([a, c]);
    }

    // Min-heap of [dist, node].
    const push = (h: number[][], v: number[]): void => {
        h.push(v);
        let i = h.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (h[i][0] < h[p][0]) {
                const t = h[i];
                h[i] = h[p];
                h[p] = t;
                i = p;
            } else break;
        }
    };
    const pop = (h: number[][]): number[] => {
        const top = h[0];
        const last = h.pop()!;
        if (h.length > 0) {
            h[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let m = i;
                if (l < h.length && h[l][0] < h[m][0]) m = l;
                if (r < h.length && h[r][0] < h[m][0]) m = r;
                if (m === i) break;
                const t = h[i];
                h[i] = h[m];
                h[m] = t;
                i = m;
            }
        }
        return top;
    };

    const INF = Infinity;
    const answer: number[] = [];
    // A trip is: reach j, buy, retrace. Any cheaper return path would
    // also be a cheaper outbound path, so the total is
    // appleCost[j] + (k+1)*d(j) with d = shortest distance from start.
    for (let start = 1; start <= n; start++) {
        // Dijkstra needs the strictly positive road weights; a popped
        // entry older than dist[u] is stale (lazy deletion).
        const dist = new Array<number>(n + 1).fill(INF);
        dist[start] = 0;
        const heap: number[][] = [[0, start]];
        while (heap.length > 0) {
            const [d, u] = pop(heap);
            if (d > dist[u]) continue;
            for (const [v, w] of adj[u]) {
                const nd = d + w;
                if (nd < dist[v]) {
                    dist[v] = nd;
                    push(heap, [nd, v]);
                }
            }
        }
        // j = start contributes d = 0, so buying locally is always a
        // candidate.
        let best = INF;
        for (let j = 1; j <= n; j++) {
            const total = appleCost[j - 1] + (k + 1) * dist[j];
            if (total < best) best = total;
        }
        answer.push(best);
    }
    return answer;
}
