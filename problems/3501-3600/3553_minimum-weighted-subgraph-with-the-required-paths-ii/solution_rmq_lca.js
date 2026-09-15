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

    // Root at 0 and walk an Euler tour iteratively, so deep chains cannot
    // overflow the call stack. Every node enters the tour at its first visit
    // and re-enters each time a child's subtree closes, giving 2n - 1
    // entries; first[v] is v's earliest slot in that sequence.
    const depth = new Int32Array(n);
    const dist = new Float64Array(n);
    const parent = new Int32Array(n);
    parent[0] = -1;
    const first = new Int32Array(n);
    const it = head.slice();
    const tour = new Int32Array(2 * n - 1);
    let m = 0;
    tour[m++] = 0;
    const stack = [0];
    while (stack.length > 0) {
        const u = stack[stack.length - 1];
        const e = it[u];
        if (e === -1) {
            stack.pop();
            if (stack.length > 0) tour[m++] = stack[stack.length - 1];
            continue;
        }
        it[u] = nxt[e];
        const v = to[e];
        if (v !== parent[u]) {
            parent[v] = u;
            depth[v] = depth[u] + 1;
            dist[v] = dist[u] + wt[e];
            first[v] = m;
            tour[m++] = v;
            stack.push(v);
        }
    }

    // Sparse table: table[k][i] is the shallowest node over the 2^k tour
    // entries from i - the range argmin under depth comparison.
    let log = 1;
    while (1 << log <= m) log++;
    const table = [];
    table.push(tour.slice());
    for (let k = 1; k < log; k++) {
        const prev = table[k - 1];
        const half = 1 << (k - 1);
        const len = m - (1 << k) + 1;
        const cur = new Int32Array(len);
        for (let i = 0; i < len; i++) {
            const a = prev[i];
            const b = prev[i + half];
            cur[i] = depth[a] <= depth[b] ? a : b;
        }
        table.push(cur);
    }

    const lca = (x, y) => {
        let l = first[x];
        let r = first[y];
        if (l > r) [l, r] = [r, l];
        const k = 31 - Math.clz32(r - l + 1);
        const a = table[k][l];
        const b = table[k][r - (1 << k) + 1];
        return depth[a] <= depth[b] ? a : b;
    };
    const distance = (x, y) => dist[x] + dist[y] - 2 * dist[lca(x, y)];

    // The minimal subtree joining a, b, c is the union of the three paths,
    // each edge lying on exactly two of them.
    return queries.map(([a, b, c]) => (distance(a, b) + distance(b, c) + distance(c, a)) / 2);
};
