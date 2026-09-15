function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
    const n = startTime.length;
    // Weighted interval scheduling: pack as (end, start, profit) so jobs
    // come out in end-time order and best[i] is final before it is read.
    const jobs: number[][] = [];
    for (let i = 0; i < n; i++) {
        jobs.push([endTime[i], startTime[i], profit[i]]);
    }
    jobs.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    const ends = jobs.map((job) => job[0]);

    const bisectRight = (values: number[], target: number, hi: number): number => {
        let lo = 0;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (values[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };

    // best[i] = max profit using only the first i jobs; best[0] = 0 anchors it.
    const best = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        const [end, start, p] = jobs[i - 1];
        // bisectRight => a job starting exactly when another ends does not
        // overlap; restricting to the first i-1 entries keeps predecessors
        // inside the processed prefix.
        const j = bisectRight(ends, start, i - 1);
        // Skip job i (inherit best[i-1]) or take it on top of best[j].
        best[i] = Math.max(best[i - 1], best[j] + p);
    }
    return best[n];
}
