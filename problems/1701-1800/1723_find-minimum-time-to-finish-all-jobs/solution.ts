function minimumTimeRequired(jobs: number[], k: number): number {
    // Biggest jobs first: the largest loads surface at the shallowest
    // levels, where the bound tightens soonest.
    const sorted = jobs.slice().sort((a, b) => b - a);
    const n = sorted.length;
    // Pessimistic upper bound: everything on one worker.
    let best = 0;
    for (const j of sorted) best += j;
    const loads: number[] = new Array(k).fill(0);

    const dfs = (i: number): void => {
        if (i === n) {
            // Every complete assignment is legal; keep its max load.
            let current = 0;
            for (const l of loads) {
                if (l > current) current = l;
            }
            if (current < best) best = current;
            return;
        }
        const seen = new Set<number>();
        for (let w = 0; w < k; w++) {
            // A worker whose current load was already tried for this job
            // leads to an identical subproblem.
            if (seen.has(loads[w])) continue;
            seen.add(loads[w]);
            // Bound: this placement can no longer beat best.
            if (loads[w] + sorted[i] >= best) continue;
            loads[w] += sorted[i];
            dfs(i + 1);
            loads[w] -= sorted[i];
            // Empty workers are interchangeable — one trial suffices.
            if (loads[w] === 0) break;
        }
    };

    dfs(0);
    return best;
}
