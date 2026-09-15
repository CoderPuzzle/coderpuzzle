/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countCompleteComponents = function (n, edges) {
    // Both directions per edge: the graph is undirected, so each
    // endpoint must list the other among its neighbors.
    const adjacency = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }

    const visited = new Array(n).fill(false);
    let complete = 0;
    for (let start = 0; start < n; start++) {
        if (visited[start]) {
            continue;
        }
        // An unclaimed vertex opens a fresh component; one flood
        // collects exactly that component and nothing else.
        visited[start] = true;
        const stack = [start];
        const component = [];
        while (stack.length > 0) {
            const node = stack.pop();
            component.push(node);
            for (const other of adjacency[node]) {
                if (!visited[other]) {
                    // Mark at push time so no vertex is stacked twice.
                    visited[other] = true;
                    stack.push(other);
                }
            }
        }
        // A component of k vertices is fully wired exactly when every
        // member is adjacent to all k - 1 others.
        const k = component.length;
        if (component.every((node) => adjacency[node].length === k - 1)) {
            complete++;
        }
    }
    return complete;
};
