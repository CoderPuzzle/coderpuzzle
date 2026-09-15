/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    // g[k] counts the BSTs on k ordered values. Picking value root as the
    // root leaves root - 1 smaller values for the left subtree and
    // k - root larger ones for the right; the two shape counts are
    // independent, so g[k] = sum over root of g[root-1] * g[k-root].
    const g = new Array(n + 1).fill(0);
    g[0] = 1;
    for (let nodes = 1; nodes <= n; ++nodes) {
        for (let root = 1; root <= nodes; ++root) {
            g[nodes] += g[root - 1] * g[nodes - root];
        }
    }
    return g[n];
};
