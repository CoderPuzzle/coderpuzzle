function isPossible(n: number, edges: number[][]): boolean {
    // One added edge flips exactly two parities, so at most four odd-degree
    // nodes are repairable. Normalized min*200001+max keys stay far below
    // Number's exact 2^53 bound, so a Set of them probes edge slots in O(1).
    const seen = new Set<number>();
    const degree = new Array(n + 1).fill(0);
    for (const [u, v] of edges) {
        ++degree[u];
        ++degree[v];
        seen.add(Math.min(u, v) * 200001 + Math.max(u, v));
    }
    const linked = (a: number, b: number): boolean => seen.has(Math.min(a, b) * 200001 + Math.max(a, b));
    const odds: number[] = [];
    for (let node = 1; node <= n; ++node) {
        if (degree[node] % 2 === 1) odds.push(node);
    }
    if (odds.length === 0) return true;
    if (odds.length > 4) return false;
    if (odds.length === 2) {
        const [a, b] = odds;
        if (!linked(a, b)) return true;
        for (let c = 1; c <= n; ++c) {
            if (c !== a && c !== b && !linked(a, c) && !linked(b, c)) {
                return true;
            }
        }
        return false;
    }
    const [w, x, y, z] = odds;
    return (!linked(w, x) && !linked(y, z)) || (!linked(w, y) && !linked(x, z)) || (!linked(w, z) && !linked(x, y));
}
