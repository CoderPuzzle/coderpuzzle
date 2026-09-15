/**
 * @param {number} maxTime
 * @param {number[][]} edges
 * @param {number[]} passingFees
 * @return {number}
 */
var minCost = function (maxTime, edges, passingFees) {
    const n = passingFees.length;
    const INF = Infinity;
    // Unfold the graph into layers indexed by exact arrival time:
    // layers[t][c] = min fee of any walk from city 0 arriving at c at
    // minute t exactly. Within one time layer, minimizing cost is
    // well-defined, so revisiting a city at a different time stays legal.
    const layers = new Array(maxTime + 1);
    const start = new Array(n).fill(INF);
    start[0] = passingFees[0];
    layers[0] = start;
    for (let t = 1; t <= maxTime; t++) {
        const cur = new Array(n).fill(INF);
        for (const [x, y, dt] of edges) {
            if (dt > t) continue; // edge cannot fit in the elapsed time
            // Relax both directions from the layer exactly dt minutes ago.
            const prev = layers[t - dt];
            if (prev[x] + passingFees[y] < cur[y]) cur[y] = prev[x] + passingFees[y];
            if (prev[y] + passingFees[x] < cur[x]) cur[x] = prev[y] + passingFees[x];
        }
        layers[t] = cur;
    }
    // Destination may be reached before maxTime: take the min over all time
    // layers; all-infinity means no feasible walk.
    let best = INF;
    for (const layer of layers) {
        if (layer[n - 1] < best) best = layer[n - 1];
    }
    return best < INF ? best : -1;
};
