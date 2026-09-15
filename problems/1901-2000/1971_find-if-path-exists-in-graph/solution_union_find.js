/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
    // No graph is built and nothing is traversed: every edge simply
    // merges the components of its two endpoints, and afterwards a
    // route exists exactly when source and destination were pulled
    // into the same component -- that is, when they share a root.
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
    for (const [u, v] of edges) {
        const ru = find(u),
            rv = find(v);
        if (ru !== rv) {
            parent[ru] = rv;
        }
    }
    return find(source) === find(destination);
};
