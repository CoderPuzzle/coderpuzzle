function maxFreeTime(eventTime: number, k: number, startTime: number[], endTime: number[]): number {
    // A meeting that stays put pins its position, so one continuous free
    // block can only stretch across gaps whose separating meetings are all
    // rescheduled — at most k of them, hence at most k + 1 consecutive gaps.
    // Compacting any k consecutive meetings against one edge of their span
    // realizes that window's gap sum as a single block.
    const n = startTime.length;
    const gaps: number[] = [startTime[0]];
    for (let i = 1; i < n; ++i) {
        gaps.push(startTime[i] - endTime[i - 1]);
    }
    gaps.push(eventTime - endTime[n - 1]);
    // Rolling sum of the k + 1 gaps around each group of k meetings.
    let window = 0;
    for (let i = 0; i <= k; ++i) {
        window += gaps[i];
    }
    let best = window;
    for (let i = k + 1; i <= n; ++i) {
        window += gaps[i] - gaps[i - k - 1];
        best = Math.max(best, window);
    }
    return best;
}
