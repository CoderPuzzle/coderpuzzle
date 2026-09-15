/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function (n, connections) {
    const graph = Array.from({ length: n }, () => []);
    for (const [a, b] of connections) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const disc = new Array(n).fill(-1);
    const low = new Array(n).fill(0);
    let timer = 0;
    const bridges = [];

    const dfs = (u, parent) => {
        // Tarjan bridge finding: disc is the DFS discovery time, low the
        // earliest discovery reachable from u's subtree via tree edges plus
        // at most one back edge
        disc[u] = timer;
        low[u] = timer;
        timer++;
        for (const v of graph[u]) {
            if (disc[v] === -1) {
                dfs(v, u);
                // fold the child's reach upward
                low[u] = Math.min(low[u], low[v]);
                // bridge iff v's subtree cannot see past u: this tree edge
                // is the only route between the two sides
                if (low[v] > disc[u]) {
                    bridges.push([Math.min(u, v), Math.max(u, v)]);
                }
            } else if (v !== parent) {
                // back edge to a non-parent ancestor relaxes low; skipping
                // the parent matters — that edge is the tree edge itself
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };

    // graph is connected, so one root reaches every server
    dfs(0, -1);
    // sort only for a deterministic output order
    bridges.sort((x, y) => (x[0] !== y[0] ? x[0] - y[0] : x[1] - y[1]));
    return bridges;
};
