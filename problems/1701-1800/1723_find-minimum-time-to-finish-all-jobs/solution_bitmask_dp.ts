function minimumTimeRequired(jobs: number[], k: number): number {
    const n = jobs.length;
    const size = 1 << n;
    const full = size - 1;
    // sums[mask]: total length of the job set named by mask, built by
    // peeling off one lowest-numbered job at a time.
    const sums: number[] = new Array(size).fill(0);
    for (let mask = 1; mask < size; mask++) {
        const low = mask & -mask;
        sums[mask] = sums[mask ^ low] + jobs[31 - Math.clz32(low)];
    }
    const total = sums[full];
    // prev[mask]: lightest maximum load achievable when the job set mask is
    // covered by the workers placed so far. One worker is placed, so every
    // set simply lands on it whole.
    let prev: number[] = sums.slice();
    for (let worker = 2; worker <= k; worker++) {
        const cur: number[] = new Array(size).fill(0);
        for (let mask = 1; mask < size; mask++) {
            const low = mask & -mask;
            const rest = mask ^ low;
            // The worker being placed must take the lowest-numbered job
            // still unserved — workers are interchangeable — so only
            // submasks holding that bit are distinct choices.
            let best = total;
            for (let sub = rest; ; sub = (sub - 1) & rest) {
                // The newcomer carries sub; everything else was already
                // solved on one fewer worker. The worse side of the pair is
                // the finished assignment's maximum load.
                let carried = prev[rest ^ sub];
                const load = sums[sub | low];
                if (carried < load) carried = load;
                if (carried < best) best = carried;
                if (sub === 0) break;
            }
            cur[mask] = best;
        }
        prev = cur;
    }
    return prev[full];
}
