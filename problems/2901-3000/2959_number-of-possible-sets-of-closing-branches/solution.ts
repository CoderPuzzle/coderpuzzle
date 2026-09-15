function numberOfSets(n: number, maxDistance: number, roads: number[][]): number {
    // n <= 10, so every closing set fits in a bitmask. Seed one matrix with
    // the minimum weight per pair (multiple roads are allowed); for each
    // candidate mask copy it and relax only through branches that survive —
    // a shortest path between survivors never needs a closed intermediate.
    // The set counts when every surviving pair is within maxDistance, and
    // leaving zero or one branch alive passes vacuously.
    const INF = 1e8; // above any legal maxDistance; INF + INF stays exact
    const weight = Array.from({ length: n }, () => new Array(n).fill(INF));
    for (let i = 0; i < n; ++i) {
        weight[i][i] = 0;
    }
    for (const [u, v, w] of roads) {
        weight[u][v] = Math.min(weight[u][v], w);
        weight[v][u] = weight[u][v];
    }
    let count = 0;
    for (let closed = 0; closed < 1 << n; ++closed) {
        const dist = weight.map((row) => row.slice());
        for (let k = 0; k < n; ++k) {
            if ((closed >> k) & 1) {
                continue;
            }
            for (let i = 0; i < n; ++i) {
                const through = dist[i][k];
                if (through >= INF) {
                    continue;
                }
                for (let j = 0; j < n; ++j) {
                    if (through + dist[k][j] < dist[i][j]) {
                        dist[i][j] = through + dist[k][j];
                    }
                }
            }
        }
        let ok = true;
        for (let i = 0; ok && i < n; ++i) {
            if ((closed >> i) & 1) {
                continue;
            }
            for (let j = 0; j < n; ++j) {
                if (!((closed >> j) & 1) && dist[i][j] > maxDistance) {
                    ok = false;
                    break;
                }
            }
        }
        if (ok) {
            ++count;
        }
    }
    return count;
}
