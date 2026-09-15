function numberOfPairs(points: number[][]): number {
    // x ascending, x-ties by y descending: every candidate lower-right
    // corner of an upper-left anchor lives at a later index, and so does
    // every potential blocker of such a pair.
    points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    const n = points.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        const top = points[i][1];
        // Tallest y seen so far that does not exceed top; a candidate at
        // height y is valid exactly when window < y.
        let window = -Infinity;
        for (let j = i + 1; j < n; j++) {
            const y = points[j][1];
            if (y > top) continue;
            if (window < y) total++;
            window = Math.max(window, y);
        }
    }
    return total;
}
