/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minimumCost = function (n, connections) {
    // union-find over n + 1 slots (index 0 unused; cities are 1-based)
    const parent = Array.from({ length: n + 1 }, (_, i) => i);
    const find = (x) => {
        // path halving keeps subsequent finds near-constant
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    // Kruskal: scan edges cheapest-first; the greedy exchange argument
    // makes the accepted set a minimum spanning tree
    const conns = connections.slice().sort((a, b) => a[2] - b[2]);
    let total = 0;
    let components = n;
    for (const [x, y, cost] of conns) {
        const rx = find(x);
        const ry = find(y);
        // take the edge only when it joins two different components,
        // i.e. it closes no cycle
        if (rx !== ry) {
            parent[rx] = ry;
            total += cost;
            components -= 1;
            // one component left: the tree is complete, later edges are
            // all more expensive
            if (components === 1) return total;
        }
    }
    // edges ran out first: the graph is disconnected
    return -1;
};
