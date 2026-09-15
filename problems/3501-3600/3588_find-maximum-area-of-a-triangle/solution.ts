function maxArea(coords: number[][]): number {
    // A valid triangle needs a horizontal or vertical side. On a
    // horizontal line y the widest base is the x-span of that line,
    // and the tallest apex is the global top or bottom point,
    // whichever lies off the line — so every line contributes two O(1)
    // candidates once points are grouped. Vertical sides mirror this.
    // 2 * area <= 2 * (10^6)^2 = 2e12 < 2^53, so Number math is exact.
    const byY = new Map<number, number[]>();
    const byX = new Map<number, number[]>();
    for (const [x, y] of coords) {
        if (!byY.has(y)) byY.set(y, []);
        if (!byX.has(x)) byX.set(x, []);
        byY.get(y)!.push(x);
        byX.get(x)!.push(y);
    }
    let gxmin = Infinity;
    let gxmax = -Infinity;
    let gymin = Infinity;
    let gymax = -Infinity;
    for (const x of byX.keys()) {
        if (x < gxmin) gxmin = x;
        if (x > gxmax) gxmax = x;
    }
    for (const y of byY.keys()) {
        if (y < gymin) gymin = y;
        if (y > gymax) gymax = y;
    }
    let best = -1;
    for (const [y, row] of byY) {
        if (row.length < 2) continue;
        let lo = row[0];
        let hi = row[0];
        for (const v of row) {
            if (v < lo) lo = v;
            if (v > hi) hi = v;
        }
        if (gymax !== y) best = Math.max(best, (hi - lo) * (gymax - y));
        if (gymin !== y) best = Math.max(best, (hi - lo) * (y - gymin));
    }
    for (const [x, col] of byX) {
        if (col.length < 2) continue;
        let lo = col[0];
        let hi = col[0];
        for (const v of col) {
            if (v < lo) lo = v;
            if (v > hi) hi = v;
        }
        if (gxmax !== x) best = Math.max(best, (hi - lo) * (gxmax - x));
        if (gxmin !== x) best = Math.max(best, (hi - lo) * (x - gxmin));
    }
    return best;
}
