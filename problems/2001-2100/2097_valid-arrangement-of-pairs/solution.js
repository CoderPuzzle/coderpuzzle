/**
 * @param {number[][]} pairs
 * @return {number[][]}
 */
var validArrangement = function (pairs) {
    // Numbers are nodes, pairs are directed edges: the arrangement is an
    // Eulerian path (a walk using every edge exactly once).
    const adj = new Map();
    const indeg = new Map();
    const outdeg = new Map();
    for (const [u, v] of pairs) {
        if (!adj.has(u)) {
            adj.set(u, []);
        }
        adj.get(u).push(v);
        outdeg.set(u, (outdeg.get(u) || 0) + 1);
        indeg.set(v, (indeg.get(v) || 0) + 1);
    }

    // The unique out-in == 1 node must start the walk; when all degrees
    // balance (Eulerian circuit) any edge-bearing node works — pairs[0][0].
    let start = pairs[0][0];
    for (const u of outdeg.keys()) {
        if ((outdeg.get(u) || 0) - (indeg.get(u) || 0) === 1) {
            start = u;
            break;
        }
    }

    // Iterative Hierholzer (explicit stack — 1e5 edges would overflow
    // recursion): deepen while unused edges remain; a node joins `path`
    // only when stuck, so unwinding emits dead-ends first.
    const stack = [start];
    const path = [];
    while (stack.length > 0) {
        const u = stack[stack.length - 1];
        const edges = adj.get(u);
        if (edges && edges.length > 0) {
            stack.push(edges.pop());
        } else {
            path.push(u);
            stack.pop();
        }
    }
    // Reversal restores walk order; consecutive nodes are the arranged pairs.
    path.reverse();

    const res = [];
    for (let i = 0; i + 1 < path.length; i++) {
        res.push([path[i], path[i + 1]]);
    }
    return res;
};
