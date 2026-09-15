function minimumCost(source: string, target: string, original: string[], changed: string[], cost: number[]): number {
    // A conversion rule is a directed edge in the 26-letter cost graph;
    // the cheapest a->b conversion is the shortest path a->b.
    const adj: number[][][] = Array.from({ length: 26 }, () => []);
    for (let e = 0; e < original.length; e++) {
        const a = original[e].charCodeAt(0) - 97;
        const b = changed[e].charCodeAt(0) - 97;
        // Duplicate rules for the same pair need no care: the relaxation test keeps the cheaper copy.
        adj[a].push([b, cost[e]]);
    }
    const INF = Infinity;

    // Min-heap of [price, letter]
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

    const dist: number[][] = [];
    for (let src = 0; src < 26; src++) {
        // Dijkstra from src: with positive costs the smallest tentative pop
        // is already final, so every letter settles exactly once.
        const row: number[] = new Array(26).fill(INF);
        row[src] = 0;
        dist.push(row);
        push([0, src]);
        while (heap.length > 0) {
            const [d, u] = pop();
            // Stale-entry guard: skip outdated heap records.
            if (d > row[u]) {
                continue;
            }
            for (const [v, w] of adj[u]) {
                const nd = d + w;
                // Relax only when the route strictly improves.
                if (nd < row[v]) {
                    row[v] = nd;
                    push([nd, v]);
                }
            }
        }
    }
    // Matching characters convert for free; one unreachable pair fails all.
    let total = 0;
    for (let p = 0; p < source.length; p++) {
        const s = source.charCodeAt(p) - 97;
        const t = target.charCodeAt(p) - 97;
        if (s === t) continue;
        const d = dist[s][t];
        if (d === INF) return -1;
        total += d;
    }
    return total;
}
