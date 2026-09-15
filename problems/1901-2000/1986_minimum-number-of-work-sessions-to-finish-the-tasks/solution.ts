function minSessions(tasks: number[], sessionTime: number): number {
    const n = tasks.length;
    const FULL = (1 << n) - 1;
    const INF = Infinity;
    // dp[mask] = (sessions_used, remaining_time_in_open_session)
    const sessions: number[] = new Array(1 << n).fill(INF);
    const remaining: number[] = new Array(1 << n).fill(0);
    sessions[0] = 0;
    for (let mask = 0; mask < 1 << n; mask++) {
        if (sessions[mask] === INF) continue;
        for (let i = 0; i < n; i++) {
            const bit = 1 << i;
            if (mask & bit) continue;
            const cost = tasks[i];
            let candS: number, candR: number;
            if (remaining[mask] >= cost) {
                candS = sessions[mask];
                candR = remaining[mask] - cost;
            } else {
                candS = sessions[mask] + 1;
                candR = sessionTime - cost;
            }
            const next = mask | bit;
            // fewer sessions wins; tie -> more remaining time wins
            if (candS < sessions[next] || (candS === sessions[next] && candR > remaining[next])) {
                sessions[next] = candS;
                remaining[next] = candR;
            }
        }
    }
    return sessions[FULL];
}
