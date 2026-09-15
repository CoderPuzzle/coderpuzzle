/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} restricted
 * @return {number}
 */
var reachableNodes = function (n, edges, restricted) {
    // One breadth-first sweep from node 0 over the tree, never entering a
    // restricted node; every dequeued node is counted exactly once.
    const blocked = new Set(restricted);
    const adjacent = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adjacent[a].push(b);
        adjacent[b].push(a);
    }
    const visited = new Array(n).fill(false);
    visited[0] = true;
    const queue = [0];
    let reached = 0;
    while (queue.length > 0) {
        const node = queue.shift();
        ++reached;
        for (const neighbor of adjacent[node]) {
            if (!visited[neighbor] && !blocked.has(neighbor)) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
    return reached;
};
