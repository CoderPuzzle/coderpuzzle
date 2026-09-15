/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
    const INF = Infinity;
    // After r full rounds, dist[v] is the cheapest fare using at
    // most r edges; k stops allow k+1 flights, so run k+1 rounds.
    let dist = new Array(n).fill(INF);
    dist[src] = 0;
    for (let i = 0; i < k + 1; i++) {
        // Relax from a frozen copy: writing in place would chain
        // several edges inside one round and exceed the stop limit.
        const ndist = dist.slice();
        let changed = false;
        for (const [f, t, price] of flights) {
            if (dist[f] + price < ndist[t]) {
                ndist[t] = dist[f] + price;
                changed = true;
            }
        }
        dist = ndist;
        // A round that changed nothing never improves later rounds.
        if (!changed) break;
    }
    // A surviving infinity means the destination is unreachable
    // within the allowance.
    return dist[dst] === INF ? -1 : dist[dst];
};
