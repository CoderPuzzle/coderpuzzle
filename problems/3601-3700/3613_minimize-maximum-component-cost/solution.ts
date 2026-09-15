function minCost(n: number, edges: number[][], k: number): number {
    // k >= n lets every node sit alone: no cut is ever needed.
    if (k >= n) return 0;

    const feasible = (t: number): boolean => {
        const parent = Array.from({ length: n }, (_, i) => i);
        const find = (x: number): number => {
            while (parent[x] !== x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        let comps = n;
        for (const [u, v, w] of edges) {
            if (w <= t) {
                const ru = find(u),
                    rv = find(v);
                if (ru !== rv) {
                    parent[ru] = rv;
                    comps -= 1;
                }
            }
        }
        return comps <= k;
    };

    if (feasible(0)) return 0;
    const weightSet = new Set(edges.map((e) => e[2]));
    const weights = Array.from(weightSet).sort((a, b) => a - b);
    let lo = 0,
        hi = weights.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(weights[mid])) hi = mid;
        else lo = mid + 1;
    }
    return weights[lo];
}
