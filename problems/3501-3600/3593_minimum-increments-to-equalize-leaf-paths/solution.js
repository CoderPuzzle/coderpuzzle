/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} cost
 * @return {number}
 */
var minIncrease = function (n, edges, cost) {
    // Scores can only be raised, so every root-to-leaf path must reach
    // M = largest raw path sum. Let f[v] be the largest raw path sum through
    // v; the total raise owed inside v's subtree is g[v] = M - f[v]. g never
    // decreases downward, so an increase is unavoidable exactly when
    // g[v] > g[parent]: that jump cannot be charged any higher. Path sums
    // reach 1e5 * 1e9 = 1e14 < 2^53, so plain numbers stay exact.
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    // Iterative rooted ordering (trees here can be a single long path).
    const parent = new Array(n).fill(0);
    const order = [0];
    const seen = new Array(n).fill(false);
    seen[0] = true;
    for (let i = 0; i < order.length; ++i) {
        const v = order[i];
        for (const w of adj[v]) {
            if (!seen[w]) {
                seen[w] = true;
                parent[w] = v;
                order.push(w);
            }
        }
    }
    // Pass 1 (bottom-up): down[v] = largest raw suffix sum v..leaf.
    const down = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; --i) {
        const v = order[i];
        let best = 0;
        for (const w of adj[v]) {
            if (parent[w] === v && down[w] > best) best = down[w];
        }
        down[v] = cost[v] + best;
    }
    // Pass 2 (top-down): f[v] = raw prefix above v + down[v]; propagate the
    // running minimum of f, and count the strict drops of f, which are
    // exactly the jumps of g.
    const prefix = new Array(n).fill(0);
    prefix[0] = cost[0];
    const f = new Array(n).fill(0);
    f[0] = down[0];
    let ans = 0;
    for (let i = 1; i < n; ++i) {
        const v = order[i];
        const p = parent[v];
        prefix[v] = prefix[p] + cost[v];
        const fv = prefix[p] + down[v];
        if (fv < f[p]) {
            ans++;
            f[v] = fv;
        } else {
            f[v] = f[p];
        }
    }
    return ans;
};
