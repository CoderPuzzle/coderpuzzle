function assignEdgeWeights(edges: number[][], queries: number[][]): number[] {
    // As in part I, a path of d edges has odd cost for exactly 2^(d-1)
    // of its 2^d assignments (d = 0 answers 0), so each query only
    // needs the path length d = depth[u] + depth[v] - 2 * depth[lca].
    // Binary lifting answers every LCA in O(log n); the tree is rooted
    // with an explicit stack because it can be a 10^5-node chain.
    const MOD = 1e9 + 7;
    const n = edges.length + 1;
    const adj = Array.from({ length: n + 1 }, () => [] as number[]);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    const depth = new Array(n + 1).fill(0);
    const parent = new Array(n + 1).fill(0);
    const seen = new Array(n + 1).fill(false);
    seen[1] = true;
    const stack = [1];
    while (stack.length) {
        const u = stack.pop()!;
        for (const v of adj[u]) {
            if (!seen[v]) {
                seen[v] = true;
                parent[v] = u;
                depth[v] = depth[u] + 1;
                stack.push(v);
            }
        }
    }
    let log = 1;
    while (1 << log < n) log++;
    const up: number[][] = [parent];
    for (let k = 1; k < log; k++) {
        const prev = up[k - 1];
        const cur = new Array(n + 1);
        for (let v = 0; v <= n; v++) cur[v] = prev[prev[v]];
        up.push(cur);
    }
    const p2 = new Array(n).fill(1);
    for (let i = 1; i < n; i++) p2[i] = (p2[i - 1] * 2) % MOD;
    const answer = new Array(queries.length);
    for (let qi = 0; qi < queries.length; qi++) {
        let [u, v] =
            depth[queries[qi][0]] >= depth[queries[qi][1]]
                ? [queries[qi][0], queries[qi][1]]
                : [queries[qi][1], queries[qi][0]];
        const du = depth[u];
        const dv = depth[v];
        let diff = du - dv;
        let k = 0;
        while (diff) {
            if (diff & 1) u = up[k][u];
            diff >>= 1;
            k++;
        }
        if (u !== v) {
            for (let kk = log - 1; kk >= 0; kk--) {
                if (up[kk][u] !== up[kk][v]) {
                    u = up[kk][u];
                    v = up[kk][v];
                }
            }
            v = parent[u];
        }
        const d = du + dv - 2 * depth[v];
        answer[qi] = d === 0 ? 0 : p2[d - 1];
    }
    return answer;
}
