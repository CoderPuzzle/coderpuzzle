/**
 * dp[v][t] = best points from v's subtree when t ancestral halvings
 * already apply to coins[v]. Halving composes with the shift and
 * coins <= 10^4 < 2^14 die after 14 halvings, so the table is 15 wide.
 * Only values <= 10^4 are shifted and totals stay <= 10^9 < 2^53, so
 * plain numbers are exact. Traversal is iterative: a path tree is 10^5
 * deep.
 * @param {number[][]} edges
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var maximumPoints = function (edges, coins, k) {
    const n = coins.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Root at 0 once: BFS fixes parents and a top-down visit order, so
    // every later pass walks flat arrays and nothing recurses.
    const parent = new Array(n).fill(-1);
    const order = [0];
    for (let i = 0; i < order.length; i++) {
        const u = order[i];
        for (const v of adj[u]) {
            if (parent[v] === -1 && v !== 0) {
                parent[v] = u;
                order.push(v);
            }
        }
    }

    // Bottom-up over reverse BFS order; s[v][t] accumulates the
    // children's dp column so each node finalizes in O(15). Column 15
    // stays 0 forever (the absorbed state).
    const s = Array.from({ length: n }, () => new Array(16).fill(0));
    const dp = Array.from({ length: n }, () => new Array(16).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        const v = order[i];
        const c = coins[v];
        for (let t = 0; t < 15; t++) {
            // First way: take the k hit (it may be negative). Second
            // way: halve, and the children inherit t + 1.
            const way1 = (c >> t) - k + s[v][t];
            const way2 = (c >> (t + 1)) + s[v][t + 1];
            dp[v][t] = Math.max(way1, way2);
        }
        const p = parent[v];
        if (p >= 0) {
            for (let t = 0; t < 15; t++) {
                s[p][t] += dp[v][t];
            }
        }
    }
    return dp[0][0];
};
