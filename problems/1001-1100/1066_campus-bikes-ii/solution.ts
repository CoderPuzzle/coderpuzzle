function assignBikes(workers: number[][], bikes: number[][]): number {
    const n = workers.length;
    const m = bikes.length;
    const dist = workers.map(([wx, wy]) => bikes.map(([bx, by]) => Math.abs(wx - bx) + Math.abs(wy - by)));
    const size = 1 << m;
    const INF = Infinity;
    const dp = new Array<number>(size).fill(INF);
    dp[0] = 0;
    let best = INF;
    for (let mask = 0; mask < size; mask++) {
        if (dp[mask] === INF) {
            continue;
        }
        let assigned = 0;
        for (let t = mask; t > 0; t >>= 1) {
            assigned += t & 1;
        }
        if (assigned === n) {
            if (dp[mask] < best) {
                best = dp[mask];
            }
            continue;
        }
        for (let b = 0; b < m; b++) {
            if (!((mask >> b) & 1)) {
                const candidate = dp[mask] + dist[assigned][b];
                const next = mask | (1 << b);
                if (candidate < dp[next]) {
                    dp[next] = candidate;
                }
            }
        }
    }
    return best;
}
