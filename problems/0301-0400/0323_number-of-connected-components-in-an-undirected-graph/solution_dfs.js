/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
    // Both directions per edge: the graph is undirected, so each
    // endpoint must list the other among its neighbors.
    const adjacency = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }
    const visited = new Array(n).fill(false);
    let components = 0;
    for (let start = 0; start < n; start++) {
        if (visited[start]) {
            continue;
        }
        // An unvisited node during the sweep starts a new component;
        // this one traversal absorbs exactly one component.
        components++;
        visited[start] = true;
        const stack = [start];
        while (stack.length > 0) {
            const node = stack.pop();
            for (const other of adjacency[node]) {
                if (!visited[other]) {
                    // Mark at push time so no node is stacked twice;
                    // membership is by visitation, so a node shared by
                    // many edges is still discovered exactly once.
                    visited[other] = true;
                    stack.push(other);
                }
            }
        }
    }
    return components;
};
