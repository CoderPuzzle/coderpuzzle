function assignEdgeWeights(edges: number[][]): number {
    // A weight of 2 never changes parity, so only the number of 1s on
    // the path to a deepest node matters: any odd-size subset of the
    // d = max depth edges gives an odd cost, and there are 2^(d-1) of
    // those. An iterative DFS finds d (the tree can be a long chain).
    const MOD = 1e9 + 7;
    const n = edges.length + 1;
    const adj = Array.from({ length: n + 1 }, () => [] as number[]);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    const depth = new Array(n + 1).fill(-1);
    depth[1] = 0;
    const stack = [1];
    let maxDepth = 0;
    while (stack.length) {
        const u = stack.pop()!;
        for (const v of adj[u]) {
            if (depth[v] < 0) {
                depth[v] = depth[u] + 1;
                if (depth[v] > maxDepth) maxDepth = depth[v];
                stack.push(v);
            }
        }
    }
    let ways = 1;
    for (let i = 0; i < maxDepth - 1; i++) ways = (ways * 2) % MOD;
    return ways;
}
