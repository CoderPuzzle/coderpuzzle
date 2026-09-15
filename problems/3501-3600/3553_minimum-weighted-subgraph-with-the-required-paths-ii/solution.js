/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var minimumWeight = function (edges, queries) {
    const n = edges.length + 1;
    const head = new Int32Array(n + 1).fill(-1);
    const nxt = new Int32Array(2 * (n - 1));
    const to = new Int32Array(2 * (n - 1));
    const wt = new Int32Array(2 * (n - 1));
    let cnt = 0;
    for (const [u, v, w] of edges) {
        to[cnt] = v;
        wt[cnt] = w;
        nxt[cnt] = head[u];
        head[u] = cnt++;
        to[cnt] = u;
        wt[cnt] = w;
        nxt[cnt] = head[v];
        head[v] = cnt++;
    }

    // Root at 0; iterative traversal so deep chains cannot overflow the stack.
    const depth = new Int32Array(n);
    const dist = new Float64Array(n);
    const parent = new Int32Array(n);
    const seen = new Uint8Array(n);
    seen[0] = 1;
    const stack = [0];
    while (stack.length > 0) {
        const u = stack.pop();
        for (let e = head[u]; e !== -1; e = nxt[e]) {
            const v = to[e];
            if (!seen[v]) {
                seen[v] = 1;
                parent[v] = u;
                depth[v] = depth[u] + 1;
                dist[v] = dist[u] + wt[e];
                stack.push(v);
            }
        }
    }

    // Binary lifting: up[k][v] is the 2^k-th ancestor of v (root's is root).
    let log = 1;
    while (1 << log <= n - 1) log++;
    const up = [];
    up.push(parent.slice());
    for (let k = 1; k < log; k++) {
        const prev = up[k - 1];
        up.push(prev.map((p) => prev[p]));
    }

    const lca = (x, y) => {
        if (depth[x] < depth[y]) [x, y] = [y, x];
        let diff = depth[x] - depth[y];
        for (let k = 0; diff > 0; k++, diff >>= 1) {
            if (diff & 1) x = up[k][x];
        }
        if (x === y) return x;
        for (let k = log - 1; k >= 0; k--) {
            if (up[k][x] !== up[k][y]) {
                x = up[k][x];
                y = up[k][y];
            }
        }
        return up[0][x];
    };
    const distance = (x, y) => dist[x] + dist[y] - 2 * dist[lca(x, y)];

    // The minimal subtree joining a, b, c is the union of the three paths,
    // each edge lying on exactly two of them.
    return queries.map(([a, b, c]) => (distance(a, b) + distance(b, c) + distance(c, a)) / 2);
};
