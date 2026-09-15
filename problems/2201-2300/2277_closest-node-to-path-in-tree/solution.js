/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
var closestNode = function (n, edges, query) {
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Breadth-first walk from the root records parents and depths
    // without recursion, so chain-shaped trees cannot overflow the
    // call stack.
    const parent = new Array(n).fill(-1);
    const depth = new Array(n).fill(0);
    const visited = new Array(n).fill(false);
    const order = [0];
    visited[0] = true;
    for (let head = 0; head < order.length; head++) {
        const u = order[head];
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                depth[v] = depth[u] + 1;
                order.push(v);
            }
        }
    }

    // up[k][v] is the 2^k-th ancestor of v, or -1 once past the root.
    let LOG = 1;
    while (1 << LOG < n) LOG++;
    const up = Array.from({ length: LOG }, () => new Array(n).fill(-1));
    up[0] = [...parent];
    for (let k = 1; k < LOG; k++) {
        for (let v = 0; v < n; v++) {
            const mid = up[k - 1][v];
            if (mid !== -1) up[k][v] = up[k - 1][mid];
        }
    }

    const lca = (u, v) => {
        if (depth[u] < depth[v]) [u, v] = [v, u];
        let diff = depth[u] - depth[v];
        let k = 0;
        while (diff > 0) {
            if (diff & 1) u = up[k][u];
            diff >>= 1;
            k++;
        }
        if (u === v) return u;
        for (let k = LOG - 1; k >= 0; k--) {
            if (up[k][u] !== up[k][v]) {
                u = up[k][u];
                v = up[k][v];
            }
        }
        return parent[u];
    };

    // The deepest of the three pairwise LCAs is where node's route
    // merges onto the start-end path -- always on the path, and the
    // unique minimizer of the distance to it.
    const answer = [];
    for (const [s, e, x] of query) {
        let best = lca(s, e);
        for (const cand of [lca(s, x), lca(e, x)]) {
            if (depth[cand] > depth[best]) best = cand;
        }
        answer.push(best);
    }
    return answer;
};
