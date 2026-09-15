/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function (edges) {
    // The center lies on every edge, so it is the one node shared by the
    // first two edges; every other node occurs in exactly one edge.
    const a = edges[0][0];
    const b = edges[0][1];
    const c = edges[1][0];
    const d = edges[1][1];
    if (a === c || a === d) {
        return a;
    }
    return b;
};
