function numberOfGoodPaths(vals: number[], edges: number[][]): number {
    const n = vals.length;
    const parent: number[] = Array.from({ length: n }, (_, i) => i);
    const size: number[] = new Array(n).fill(1);
    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a: number, b: number): void => {
        let ra = find(a);
        let rb = find(b);
        if (ra === rb) return;
        if (size[ra] < size[rb]) {
            const t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    };

    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    const byValue = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        if (!byValue.has(vals[i])) byValue.set(vals[i], []);
        byValue.get(vals[i])!.push(i);
    }

    let answer = 0;
    const valueKeys = [...byValue.keys()].sort((a, b) => a - b);
    // Activate nodes in increasing value order: smaller values are
    // already merged, so unions only ever connect components whose
    // nodes are all <= v.
    for (const v of valueKeys) {
        for (const u of byValue.get(v)!) {
            // Union across edges to already-active (<= v) endpoints: the
            // value-v nodes are then connected exactly through paths
            // whose interior nodes are all <= v.
            for (const w of adj[u]) {
                if (vals[w] <= v) union(u, w);
            }
        }
        // Group this value's nodes by component; a component holding c
        // of them yields c*(c-1)/2 good paths (each unordered pair).
        const componentCount = new Map<number, number>();
        for (const u of byValue.get(v)!) {
            const r = find(u);
            componentCount.set(r, (componentCount.get(r) || 0) + 1);
        }
        for (const c of componentCount.values()) {
            answer += (c * (c - 1)) / 2;
        }
    }
    // Every single node is a good path on its own.
    return answer + n;
}
