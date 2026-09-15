/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
    const n = graph.length;
    const target = n - 1;
    const paths = [];
    const path = [0];

    // The graph is acyclic, so every walk from 0 is a simple
    // path and DFS can never loop; at the target, snapshot a
    // copy and stop.
    function dfs(node) {
        if (node === target) {
            paths.push(path.slice());
            return;
        }
        for (const nxt of graph[node]) {
            // Backtrack: pop after returning so sibling branches
            // each see a clean path. No visited set is needed —
            // paths legitimately share prefixes.
            path.push(nxt);
            dfs(nxt);
            path.pop();
        }
    }

    dfs(0);
    return paths;
};
