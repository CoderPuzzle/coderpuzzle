/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var minCost = function (n, edges, k) {
    // k >= n lets every node sit alone: no cut is ever needed.
    if (k >= n) return 0;

    const feasible = (t) => {
        const parent = Array.from({ length: n }, (_, i) => i);
        const find = (x) => {
            while (parent[x] !== x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        // Keep only edges of weight <= t: the union-find then holds exactly
        // the components left after cutting every heavier edge, and any
        // further removal only increases the count, so t works iff <= k.
        let comps = n;
        for (const [u, v, w] of edges) {
            if (w <= t) {
                const ru = find(u),
                    rv = find(v);
                if (ru !== rv) {
                    parent[ru] = rv;
                    comps -= 1;
                }
            }
        }
        return comps <= k;
    };

    // Weights are >= 1, so t = 0 keeps no edges; if even the edgeless
    // split fits in k parts, nothing needs cutting.
    if (feasible(0)) return 0;
    // Feasibility is monotone in t and only changes at edge weights, so
    // binary search the sorted distinct weights for the smallest feasible.
    const weightSet = new Set(edges.map((e) => e[2]));
    const weights = Array.from(weightSet).sort((a, b) => a - b);
    let lo = 0,
        hi = weights.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(weights[mid])) hi = mid;
        else lo = mid + 1;
    }
    return weights[lo];
};
