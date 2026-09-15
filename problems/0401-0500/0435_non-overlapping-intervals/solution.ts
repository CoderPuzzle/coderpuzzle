function eraseOverlapIntervals(intervals: number[][]): number {
    // Minimizing removals = maximizing kept non-overlapping intervals, so
    // sweep by earliest end: keeping the earliest-ending candidate leaves the
    // most room for everything after it.
    const ordered = [...intervals].sort((a, b) => a[1] - b[1]);
    let removed = 0;
    // Sentinel below any real endpoint (endpoints may be negative).
    let prevEnd = -Infinity;
    for (const [start, end] of ordered) {
        // Touching endpoints do not overlap, so start == prevEnd keeps.
        if (start >= prevEnd) {
            prevEnd = end;
        } else {
            // Discarded: it intersects the last kept (earliest-ending)
            // interval, so one removal per conflict is exactly optimal.
            removed++;
        }
    }
    return removed;
}
