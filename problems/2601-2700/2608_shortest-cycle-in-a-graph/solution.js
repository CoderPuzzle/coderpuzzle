/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var findShortestCycle = function (n, edges) {
    // BFS from every vertex: non-tree edges (u, v) close cycles of length
    // dist[u] + dist[v] + 1 through the root's levels, and scanning all
    // roots measures every cycle at one of its own vertices.
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }
    let best = -1;
    const dist = new Array(n).fill(-1);
    const parent = new Array(n).fill(-1);
    const queue = new Array(n);
    for (let start = 0; start < n; start++) {
        dist[start] = 0;
        queue[0] = start;
        let head = 0;
        let tail = 1;
        while (head < tail) {
            const u = queue[head++];
            for (const v of adj[u]) {
                if (dist[v] === -1) {
                    dist[v] = dist[u] + 1;
                    parent[v] = u;
                    queue[tail++] = v;
                } else if (parent[u] !== v && parent[v] !== u) {
                    // Tree edges would double-count one path instead of
                    // closing a ring, so only genuine cross links count.
                    const length = dist[u] + dist[v] + 1;
                    if (best === -1 || length < best) best = length;
                }
            }
        }
        // Reset just the vertices this search reached.
        for (let i = 0; i < tail; i++) {
            dist[queue[i]] = -1;
            parent[queue[i]] = -1;
        }
    }
    return best;
};
