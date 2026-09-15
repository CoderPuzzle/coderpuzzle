function maxPartitionFactor(points: number[][]): number {
    const n = points.length;
    // Both groups are singletons, so no intra-group pair exists and the
    // factor is 0 by definition.
    if (n === 2) {
        return 0;
    }
    const dist = points.map((a) => points.map((b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])));
    // Every pair closer than limit must be split across the two groups --
    // exactly "the conflict graph is bipartite".
    const separable = (limit: number): boolean => {
        const color = new Int32Array(n).fill(-1);
        const stack: number[] = [];
        for (let start = 0; start < n; ++start) {
            if (color[start] !== -1) {
                continue;
            }
            color[start] = 0;
            stack.push(start);
            while (stack.length > 0) {
                const u = stack.pop();
                const cu = color[u];
                for (let v = 0; v < n; ++v) {
                    if (v === u || dist[u][v] >= limit) {
                        continue;
                    }
                    if (color[v] === -1) {
                        color[v] = cu ^ 1;
                        stack.push(v);
                    } else if (color[v] === cu) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    // The factor of any split is 0 or one of the inter-point distances, so
    // binary search probes those candidate thresholds only.
    const seen = new Set<number>([0]);
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            seen.add(dist[i][j]);
        }
    }
    const candidates = [...seen].sort((a, b) => a - b);
    // Raising the threshold only adds conflict edges, so feasibility is
    // monotone and the largest separable threshold is the answer.
    let lo = 0;
    let hi = candidates.length - 1;
    while (lo < hi) {
        const mid = lo + ((hi - lo + 1) >> 1);
        if (separable(candidates[mid])) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return candidates[lo];
}
