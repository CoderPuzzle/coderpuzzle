function findMinDifference(timePoints: string[]): number {
    // Only 24*60 distinct minute marks exist, so convert each "HH:MM"
    // once and sort: the closest pair must be adjacent in sorted order.
    const minutes = timePoints.map((time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3)));
    minutes.sort((a, b) => a - b);
    // The clock wraps, so the first and last marks are also a pair —
    // the one that spans midnight; its gap is first + 1440 - last.
    let best = minutes[0] + 24 * 60 - minutes[minutes.length - 1];
    for (let index = 1; index < minutes.length; ++index) {
        best = Math.min(best, minutes[index] - minutes[index - 1]);
    }
    return best;
}
