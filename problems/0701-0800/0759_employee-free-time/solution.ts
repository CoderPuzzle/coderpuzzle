function employeeFreeTime(schedule: number[][][]): number[][] {
    const intervals: number[][][] = schedule;
    // A moment is free exactly when no employee is busy, so only the
    // union matters: pool every interval, forgetting ownership.
    const pooled = ([] as number[][]).concat(...intervals);
    // Sorted by start (then end), the sweep meets busy blocks in order.
    pooled.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    const free: number[][] = [];
    let previousEnd: number | null = null;
    for (const [start, end] of pooled) {
        // Starting strictly beyond the furthest end seen so far proves
        // nothing covers (previousEnd, start); strictness keeps
        // touching intervals continuous (no zero-length gaps).
        if (previousEnd !== null && start > previousEnd) {
            free.push([previousEnd, start]);
        }
        // Otherwise merge into the busy block, keeping the running max
        // of ends so a long interval absorbs shorter ones inside it.
        previousEnd = previousEnd === null ? end : Math.max(previousEnd, end);
    }
    return free;
}
