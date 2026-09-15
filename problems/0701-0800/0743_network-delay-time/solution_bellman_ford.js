/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
    const INF = 1e8;
    const dist = new Array(n + 1).fill(INF);
    dist[k] = 0;
    // Each round extends shortest paths by one edge, so n-1 rounds suffice.
    for (let round = 0; round < n - 1; round++) {
        let changed = false;
        for (const [u, v, w] of times) {
            if (dist[u] < INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                changed = true;
            }
        }
        // A round that relaxes nothing means the distances are final.
        if (!changed) break;
    }
    let best = 0;
    for (let i = 1; i <= n; i++) {
        // Anything still at INF is unreachable from k.
        if (dist[i] >= INF) return -1;
        if (dist[i] > best) best = dist[i];
    }
    return best;
};
