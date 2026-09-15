function leastInterval(tasks: string[], n: number): number {
    const counts = new Map<string, number>();
    for (const t of tasks) {
        counts.set(t, (counts.get(t) || 0) + 1);
    }
    let maxFreq = 0;
    let numMax = 0;
    for (const v of counts.values()) {
        if (v > maxFreq) {
            maxFreq = v;
            numMax = 1;
        } else if (v === maxFreq) {
            // Letters tying the max each occupy one slot of the final partial run.
            numMax++;
        }
    }
    // The bottleneck letter frames (maxFreq - 1) cycles of n + 1 plus the
    // final run; enough distinct tasks fill every gap, so never answer less
    // than the plain task count.
    return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + numMax);
}
