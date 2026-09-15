function removeCoveredIntervals(intervals: number[][]): number {
    // Sort by start ascending, end DESCENDING: then any interval whose end
    // is not beyond the best end seen so far must sit inside some earlier
    // interval (equal starts sort the wider one first, so the narrower twin
    // is correctly counted as covered).
    intervals.sort(function (a, b) {
        return a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1];
    });
    let remaining = 0;
    let bestEnd = 0;
    for (const [, end] of intervals) {
        if (end > bestEnd) {
            remaining++;
            bestEnd = end;
        }
    }
    return remaining;
}
