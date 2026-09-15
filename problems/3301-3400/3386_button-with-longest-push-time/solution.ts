function buttonWithLongestTime(events: number[][]): number {
    // Press i takes time_i - time_{i-1} (its own time_i for the first
    // press). Keep the best press seen so far, replacing it on a strictly
    // longer time, or on an equal time from a smaller button index — the
    // statement's tie rule.
    let bestIndex = events[0][0];
    let bestTaken = events[0][1];
    for (let i = 1; i < events.length; i++) {
        const index = events[i][0];
        const taken = events[i][1] - events[i - 1][1];
        if (taken > bestTaken || (taken === bestTaken && index < bestIndex)) {
            bestIndex = index;
            bestTaken = taken;
        }
    }
    return bestIndex;
}
