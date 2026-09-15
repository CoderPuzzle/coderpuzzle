function findMinArrowShots(points: number[][]): number {
    // Point-cover greedy: sort by right endpoint and shoot at the right end
    // of the first unburst balloon — among points covering it, the right
    // endpoint covers every interval any earlier point could.
    const ordered = [...points].sort((a, b) => a[1] - b[1]);
    let arrows = 0;
    // Sentinel below any coordinate (coordinates span signed 32-bit).
    let lastArrow = -Infinity;
    for (const [start, end] of ordered) {
        // Strict >: intervals are closed, so start == lastArrow is already
        // burst; otherwise shoot at the earliest end remaining.
        if (start > lastArrow) {
            arrows++;
            lastArrow = end;
        }
    }
    return arrows;
}
