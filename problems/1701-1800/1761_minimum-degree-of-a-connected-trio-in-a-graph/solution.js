/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var minTrioDegree = function (n, edges) {
    // A trio's degree is deg(u) + deg(v) + deg(w) - 6: the three
    // internal edges are exactly the ones double-counted by vertex
    // degrees. Rank the nodes by (degree, id) and keep each node's
    // neighbors as a bitset over those ranks; the cheapest trio
    // through an edge (u, v) uses the minimum-degree common
    // neighbor, which is the lowest set bit of mask[u] & mask[v].
    // Ranks can reach 400, so the masks are BigInts.
    const deg = new Array(n + 1).fill(0);
    for (const [u, v] of edges) {
        deg[u] += 1;
        deg[v] += 1;
    }

    const order = Array.from({ length: n }, (_, i) => i + 1);
    order.sort((a, b) => (deg[a] !== deg[b] ? deg[a] - deg[b] : a - b));
    const rank = new Array(n + 1).fill(0);
    const degAt = new Array(n).fill(0);
    order.forEach((node, p) => {
        rank[node] = p;
        degAt[p] = deg[node];
    });

    const mask = new Array(n + 1).fill(0n);
    for (const [u, v] of edges) {
        mask[u] |= 1n << BigInt(rank[v]);
        mask[v] |= 1n << BigInt(rank[u]);
    }

    let best = 3 * n;
    for (const [u, v] of edges) {
        const common = mask[u] & mask[v];
        if (common !== 0n) {
            const p = (common & -common).toString(2).length - 1;
            const cand = deg[u] + deg[v] + degAt[p] - 6;
            if (cand < best) {
                best = cand;
            }
        }
    }
    return best < 3 * n ? best : -1;
};
