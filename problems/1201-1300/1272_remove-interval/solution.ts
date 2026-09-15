function removeInterval(intervals: number[][], toBeRemoved: number[]): number[][] {
    // Per interval, three outcomes: disjoint from the removal (keep whole),
    // straddling the left edge (keep head), or straddling the right edge
    // (keep tail); a full cover keeps nothing. An interval can only ever
    // be cut into two pieces, never more.
    const removeStart = toBeRemoved[0];
    const removeEnd = toBeRemoved[1];
    const kept: number[][] = [];
    for (const [start, end] of intervals) {
        if (start >= removeEnd || end <= removeStart) {
            kept.push([start, end]);
            continue;
        }
        if (start < removeStart) {
            kept.push([start, removeStart]);
        }
        if (end > removeEnd) {
            kept.push([removeEnd, end]);
        }
    }
    return kept;
}
