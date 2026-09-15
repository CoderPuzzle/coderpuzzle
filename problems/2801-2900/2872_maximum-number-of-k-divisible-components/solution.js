/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} values
 * @param {number} k
 * @return {number}
 */
var maxKDivisibleComponents = function (n, edges, values, k) {
    const adj = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Iterative DFS from root 0 to get a processing order (parents first).
    const parent = new Array(n).fill(-1);
    const order = [];
    const stack = [0];
    const visited = new Array(n).fill(false);
    visited[0] = true;
    while (stack.length) {
        const u = stack.pop();
        order.push(u);
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                stack.push(v);
            }
        }
    }

    // Process children before parents; cut an edge whenever the finished
    // subtree sum is divisible by k.
    const subtree = values.slice();
    let components = 0;
    for (let i = order.length - 1; i >= 0; i--) {
        const u = order[i];
        if (u !== 0) {
            if (subtree[u] % k === 0) {
                components++;
            } else {
                subtree[parent[u]] += subtree[u];
            }
        }
    }
    return components + 1;
};
