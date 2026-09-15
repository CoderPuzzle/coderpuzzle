/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
    // Connecting n computers needs at least n-1 cables; with fewer the
    // task is impossible no matter how cables are rearranged.
    if (connections.length < n - 1) {
        return -1;
    }
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x) => {
        // Union-find with path halving: point each node at its
        // grandparent while climbing toward the root.
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    // Count components: every union between two different roots merges
    // two components; a cable whose endpoints already share a root is
    // redundant (the spare cable the counting argument relies on).
    let components = n;
    for (const [a, b] of connections) {
        const ra = find(a);
        const rb = find(b);
        if (ra !== rb) {
            parent[ra] = rb;
            components--;
        }
    }
    // Each move links two components, so the minimum is components - 1.
    return components - 1;
};
