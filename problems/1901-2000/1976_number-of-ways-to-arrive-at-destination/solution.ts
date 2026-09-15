function countPaths(n: number, roads: number[][]): number {
    const MOD = 1000000007;
    const adj: number[][][] = Array.from({ length: n }, () => []);
    for (const [u, v, t] of roads) {
        adj[u].push([v, t]);
        adj[v].push([u, t]);
    }
    const INF = Infinity;
    const dist: number[] = new Array(n).fill(INF);
    const ways: number[] = new Array(n).fill(0);
    dist[0] = 0;
    ways[0] = 1; // exactly one way to be at the source: the empty path
    // min-heap of encoded values dist * n + node (node < n)
    const hpush = (h: number[], v: number): void => {
        h.push(v);
        let i = h.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (h[p] <= h[i]) break;
            const t = h[p];
            h[p] = h[i];
            h[i] = t;
            i = p;
        }
    };
    const hpop = (h: number[]): number => {
        const top = h[0];
        const last = h.pop()!;
        if (h.length > 0) {
            h[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1;
                const r = l + 1;
                let s = i;
                if (l < h.length && h[l] < h[s]) s = l;
                if (r < h.length && h[r] < h[s]) s = r;
                if (s === i) break;
                const t = h[s];
                h[s] = h[i];
                h[i] = t;
                i = s;
            }
        }
        return top;
    };
    const heap: number[] = [];
    hpush(heap, 0);
    while (heap.length > 0) {
        const enc = hpop(heap);
        const d = Math.floor(enc / n);
        const u = enc % n;
        // Positive weights => u is finalized only after every shortest path
        // into it was relaxed, so ways[u] is complete at pop time;
        // d > dist[u] just discards a stale heap entry.
        if (d > dist[u]) continue;
        for (const [v, t] of adj[u]) {
            const nd = d + t;
            if (nd < dist[v]) {
                // Strictly shorter route: old path counts are obsolete, reset.
                dist[v] = nd;
                ways[v] = ways[u];
                hpush(heap, nd * n + v);
            } else if (nd === dist[v]) {
                // Equally short route: extend the count, not the distance.
                ways[v] = (ways[v] + ways[u]) % MOD;
            }
        }
    }
    return ways[n - 1] % MOD;
}
