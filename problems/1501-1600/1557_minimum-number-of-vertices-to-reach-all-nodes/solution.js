/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findSmallestSetOfVertices = function (n, edges) {
    // A node with no incoming edge can only ever be reached by itself, so
    // it must be a starting vertex. Every other node has at least one
    // incoming edge and is therefore reachable from wherever that edge
    // originates, so the in-degree-zero nodes are also sufficient.
    const inDegree = new Array(n).fill(0);
    for (const [, to] of edges) inDegree[to]++;
    const result = [];
    for (let node = 0; node < n; node++) if (inDegree[node] === 0) result.push(node);
    return result;
};
