/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
    // Build the adjacency list, then run a breadth-first search from
    // source. The graph is undirected, so every edge is added in both
    // directions. A visited array keeps the search from re-processing
    // nodes; if destination is reached the path exists, and when the
    // queue empties without reaching it, no path can exist either.
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    if (source === destination) return true;
    const visited = new Array(n).fill(false);
    visited[source] = true;
    const pending = [source];
    while (pending.length > 0) {
        const node = pending.shift();
        for (const neighbor of graph[node]) {
            if (neighbor === destination) return true;
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                pending.push(neighbor);
            }
        }
    }
    return false;
};
