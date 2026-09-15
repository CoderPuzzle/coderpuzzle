function maxProfitAssignment(difficulty: number[], profit: number[], worker: number[]): number {
    // Workers never compete: jobs are reusable, so each worker simply
    // earns the maximum profit among the jobs whose difficulty is at
    // most their ability. Sort the jobs by difficulty, carry the running
    // profit maximum, and read every worker's earning off a binary
    // search into the sorted difficulties.
    const jobs = difficulty.map((d, i) => [d, profit[i]] as [number, number]).sort((a, b) => a[0] - b[0]);
    const hardest: number[] = [];
    const best: number[] = [];
    let top = 0;
    for (const [d, p] of jobs) {
        top = Math.max(top, p);
        hardest.push(d);
        best.push(top);
    }
    let total = 0;
    for (const ability of worker) {
        let low = 0;
        let high = hardest.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (hardest[mid] <= ability) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        if (low > 0) {
            total += best[low - 1];
        }
    }
    return total;
}
