/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
var minimumDiameterAfterMerge = function (edges1, edges2) {
    // Whatever the attachment pair, the merged diameter is the max of
    // three candidates: each original diameter, and the path that crosses
    // the new edge -- deepest leg of tree 1 from its attachment node,
    // plus deepest leg of tree 2, plus 1. Only the third term depends on
    // the choice, and the minimum over attachment nodes of the deepest
    // leg is the radius ceil(d / 2). So connect the two centers: answer
    // = max(d1, d2, ceil(d1/2) + ceil(d2/2) + 1). Each diameter comes
    // from two strictly iterative BFS sweeps (index-head queues -- shift
    // would be quadratic at 1e5 nodes); no recursion anywhere.
    const diameter = (edges) => {
        const n = edges.length + 1;
        const adj = Array.from({ length: n }, () => []);
        for (const [a, b] of edges) {
            adj[a].push(b);
            adj[b].push(a);
        }
        const sweep = (src) => {
            const dist = new Array(n).fill(-1);
            dist[src] = 0;
            const queue = [src];
            let head = 0;
            let far = src;
            let best = 0;
            while (head < queue.length) {
                const u = queue[head++];
                for (const v of adj[u]) {
                    if (dist[v] < 0) {
                        dist[v] = dist[u] + 1;
                        if (dist[v] > best) {
                            far = v;
                            best = dist[v];
                        }
                        queue.push(v);
                    }
                }
            }
            return { far, best };
        };
        const first = sweep(0);
        return sweep(first.far).best;
    };
    const d1 = diameter(edges1);
    const d2 = diameter(edges2);
    return Math.max(d1, d2, Math.ceil(d1 / 2) + Math.ceil(d2 / 2) + 1);
};
