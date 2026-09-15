function minCostToSupplyWater(n: number, wells: number[], pipes: number[][]): number {
    // Prim over sites 1..n plus a virtual node 0 (source edges): grow the
    // tree outward from node 0, always settling the cheapest frontier
    // edge; an edge must beat the site's recorded best to be pushed.
    const adj: number[][][] = Array.from({ length: n + 1 }, () => [] as number[][]);
    for (let i = 0; i < n; i++) {
        adj[0].push([wells[i], i + 1]);
        adj[i + 1].push([wells[i], 0]);
    }
    for (const [house1, house2, cost] of pipes) {
        adj[house1].push([cost, house2]);
        adj[house2].push([cost, house1]);
    }

    const INF = Infinity;
    const best: number[] = new Array(n + 1).fill(INF);
    best[0] = 0;
    const visited: boolean[] = new Array(n + 1).fill(false);

    // Min-heap of [cost, site]
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

    push([0, 0]);
    let total = 0;
    let taken = 0;
    while (heap.length > 0) {
        const [cost, site] = pop();
        // Stale-entry guard: the site already joined the tree earlier.
        if (visited[site]) {
            continue;
        }
        visited[site] = true;
        total += cost;
        taken += 1;
        if (taken === n + 1) {
            break;
        }
        for (const [w, v] of adj[site]) {
            // Relax only when the link strictly improves the site's best.
            if (!visited[v] && w < best[v]) {
                best[v] = w;
                push([w, v]);
            }
        }
    }
    return total;
}
