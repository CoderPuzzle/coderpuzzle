function splitPainting(segments: number[][]): number[][] {
    // Difference events per segment: +color at its start, -color at its end.
    // The mixed sum is piecewise constant and can only change at these
    // coordinates.
    const diff = new Map<number, number>();
    for (const [start, end, color] of segments) {
        diff.set(start, (diff.get(start) || 0) + color);
        diff.set(end, (diff.get(end) || 0) - color);
    }
    const keys = Array.from(diff.keys()).sort((a, b) => a - b);
    const result: number[][] = [];
    let running = 0;
    for (let i = 0; i < keys.length - 1; i++) {
        // Between consecutive event coordinates the active set is fixed, so
        // running is the mixed color on that open interval. Colors are
        // distinct, so each event genuinely changes the sum -- emitting at
        // every coordinate is minimal, not merely correct.
        running += diff.get(keys[i])!;
        if (running > 0) {
            // skip unpainted gaps where nothing is active
            result.push([keys[i], keys[i + 1], running]);
        }
    }
    return result;
}
