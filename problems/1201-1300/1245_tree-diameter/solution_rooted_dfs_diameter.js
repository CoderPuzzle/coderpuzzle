/**
 * @param {number[][]} edges
 * @return {number}
 */
var treeDiameter = function (edges) {
    // No edges: a single-node tree, diameter 0.
    if (edges.length === 0) return 0;
    const n = edges.length + 1;
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Iterative DFS from root 0 with an explicit stack. Each node is
    // recorded as it is popped, and entered only from the neighbor it
    // came from, so `order` meets parents before children.
    const parent = new Array(n).fill(-1);
    const order = [];
    const stack = [0];
    while (stack.length > 0) {
        const u = stack.pop();
        order.push(u);
        for (const v of adj[u]) {
            if (v !== parent[u]) {
                parent[v] = u;
                stack.push(v);
            }
        }
    }

    // Reversed, `order` is a bottom-up order: children settle before
    // parents. At each node the two deepest child heights combine:
    // their sum is the widest path turning there, the deeper one
    // alone is the node's own height for its parent.
    const height = new Array(n).fill(0);
    let diameter = 0;
    for (let i = n - 1; i >= 0; i--) {
        const u = order[i];
        let first = 0;
        let second = 0;
        for (const v of adj[u]) {
            if (v !== parent[u]) {
                const child = height[v] + 1;
                if (child > first) {
                    second = first;
                    first = child;
                } else if (child > second) {
                    second = child;
                }
            }
        }
        height[u] = first;
        if (first + second > diameter) diameter = first + second;
    }
    return diameter;
};
