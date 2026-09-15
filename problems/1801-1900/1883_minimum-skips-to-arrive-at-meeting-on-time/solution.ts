function minSkips(dist: number[], speed: number, hoursBefore: number): number {
    // dp[j] = smallest accumulated time (in distance units) after the
    // current road with j skips used; rests already rounded. Rest:
    // ceil((t+d)/speed)*speed at same j; skip: t+d at j+1. Max scaled
    // value ~ n*max_dist + slack = 1e8-ish; stays below 2^53 but the
    // limit check uses hoursBefore*speed up to 1e13, so compare with a
    // cap to remain exact.
    const CAP = 4e15;
    const n = dist.length;
    const INF = CAP;
    const dp = new Array<number>(n + 1).fill(INF);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
        const d = dist[i];
        const ndp = new Array<number>(n + 1).fill(INF);
        if (i === n - 1) {
            for (let j = 0; j <= n; j++) {
                if (dp[j] < INF && dp[j] + d < ndp[j]) {
                    ndp[j] = dp[j] + d;
                }
            }
        } else {
            for (let j = 0; j < n; j++) {
                const t = dp[j];
                if (t >= INF) {
                    continue;
                }
                const arr = t + d;
                if (arr < ndp[j + 1]) {
                    ndp[j + 1] = arr;
                }
                const rested = Math.ceil(arr / speed) * speed;
                if (rested < ndp[j]) {
                    ndp[j] = rested;
                }
            }
        }
        for (let j = 0; j <= n; j++) {
            dp[j] = ndp[j];
        }
    }
    const limit = hoursBefore * speed;
    for (let j = 0; j <= n; j++) {
        if (dp[j] < INF && dp[j] <= limit) {
            return j;
        }
    }
    return -1;
}
