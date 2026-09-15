function maximizeSumOfWeights(edges: number[][], k: number): number {
    let n = 0;
    for (const [u, v] of edges) {
        if (u > n) n = u;
        if (v > n) n = v;
    }
    n++;
    const adj: [number, number][][] = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    const parent = new Array<number>(n).fill(-1);
    const order: number[] = [];
    parent[0] = 0;
    const stack: number[] = [0];
    while (stack.length) {
        const u = stack.pop()!;
        order.push(u);
        for (const [v] of adj[u]) {
            if (v === parent[u]) continue;
            parent[v] = u;
            stack.push(v);
        }
    }

    // g[u]: best subtree sum when the edge to u's parent is NOT kept.
    // f[u]: best subtree sum when the edge to u's parent IS kept.
    const g = new Array<number>(n).fill(0);
    const f = new Array<number>(n).fill(0);
    for (let oi = order.length - 1; oi >= 0; oi--) {
        const u = order[oi];
        let total = 0;
        const gains: number[] = [];
        for (const [v, w] of adj[u]) {
            if (parent[v] === u) {
                total += g[v];
                gains.push(w + f[v] - g[v]);
            }
        }
        gains.sort((a, b) => b - a);
        const take = Math.min(k, gains.length);
        const take1 = Math.min(k - 1, gains.length);
        let s0 = total;
        let s1 = total;
        for (let i = 0; i < take; i++) {
            if (gains[i] > 0) s0 += gains[i];
        }
        for (let i = 0; i < take1; i++) {
            if (gains[i] > 0) s1 += gains[i];
        }
        g[u] = s0;
        f[u] = s1;
    }
    return g[0];
}
