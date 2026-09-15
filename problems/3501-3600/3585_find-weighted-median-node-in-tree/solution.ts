function findMedian(n: number, edges: number[][], queries: number[][]): number[] {
    // Root the tree at 0 with an explicit stack (a 10^5-node chain
    // would blow Node's stack), recording parent, depth and weighted
    // root distance. Binary lifting then answers each query in
    // O(log n): lift to the LCA l, take the total path weight tot and
    // the cumulative sum acc from u to l. "Sum >= tot/2" is tested as
    // 2 * sum >= tot so no halves appear; all distances stay <=
    // 10^5 * 10^9 = 10^14 < 2^53, so Number arithmetic is exact.
    const adj: number[][][] = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }
    const parent = new Array(n).fill(0);
    const depth = new Array(n).fill(0);
    const dist = new Array(n).fill(0);
    const seen = new Array(n).fill(false);
    seen[0] = true;
    const stack = [0];
    while (stack.length) {
        const u = stack.pop()!;
        for (const [v, w] of adj[u]) {
            if (!seen[v]) {
                seen[v] = true;
                parent[v] = u;
                depth[v] = depth[u] + 1;
                dist[v] = dist[u] + w;
                stack.push(v);
            }
        }
    }
    let log = 1;
    while (1 << log < n) log++;
    const up: number[][] = [parent];
    for (let k = 1; k < log; k++) {
        const prev = up[k - 1];
        const cur = new Array(n);
        for (let v = 0; v < n; v++) cur[v] = prev[prev[v]];
        up.push(cur);
    }
    const answer = new Array(queries.length);
    for (let qi = 0; qi < queries.length; qi++) {
        const a = queries[qi][0];
        const b = queries[qi][1];
        if (a === b) {
            // Single-node path: the sum from a to itself (0) already
            // meets half of the zero total, so a is the median.
            answer[qi] = a;
            continue;
        }
        let u = a;
        let v = b;
        if (depth[u] < depth[v]) {
            [u, v] = [v, u];
        }
        let diff = depth[u] - depth[v];
        let k = 0;
        while (diff) {
            if (diff & 1) u = up[k][u];
            diff >>= 1;
            k++;
        }
        let l = v;
        if (u !== v) {
            for (let kk = log - 1; kk >= 0; kk--) {
                if (up[kk][u] !== up[kk][v]) {
                    u = up[kk][u];
                    v = up[kk][v];
                }
            }
            l = parent[u];
        }
        const tot = dist[a] + dist[b] - 2 * dist[l];
        const acc = dist[a] - dist[l];
        if (2 * acc >= tot) {
            // Median on the a -> l stretch. Climb from a while the
            // criterion still fails; the parent of the deepest failing
            // node is the first one that satisfies it.
            let x = a;
            for (let kk = log - 1; kk >= 0; kk--) {
                const t = up[kk][x];
                if (depth[t] >= depth[l] && 2 * (dist[a] - dist[t]) < tot) {
                    x = t;
                }
            }
            answer[qi] = parent[x];
        } else {
            // Median on the l -> b stretch. Climb from b while the
            // criterion still holds; the highest such node (never l
            // itself, which failed) is the median.
            let x = b;
            for (let kk = log - 1; kk >= 0; kk--) {
                const t = up[kk][x];
                if (depth[t] > depth[l] && 2 * (acc + dist[t] - dist[l]) >= tot) {
                    x = t;
                }
            }
            answer[qi] = x;
        }
    }
    return answer;
}
