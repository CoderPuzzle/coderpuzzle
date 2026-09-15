/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
    const parent = new Array(n);
    for (let i = 0; i < n; i++) parent[i] = i;
    // Path-halving: splice every other node directly under its
    // grandparent, flattening the tree while walking to the root.
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    // Every node begins as its own component.
    let count = n;
    for (const [a, b] of edges) {
        const ra = find(a),
            rb = find(b);
        // An edge joining two distinct roots merges two components;
        // one whose endpoints already share a root is redundant.
        if (ra !== rb) {
            parent[ra] = rb;
            count--;
        }
    }
    return count;
};
