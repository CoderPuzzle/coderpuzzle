function numPoints(darts: number[][], r: number): number {
    const n = darts.length;
    let best = 1;
    const r2 = r * r;
    const eps = 1e-7;
    const countAt = (cx: number, cy: number): number => {
        let count = 0;
        for (const [x, y] of darts) {
            const dx = x - cx;
            const dy = y - cy;
            if (dx * dx + dy * dy <= r2 + eps) {
                count++;
            }
        }
        return count;
    };
    for (const [x, y] of darts) {
        best = Math.max(best, countAt(x, y));
    }
    for (let i = 0; i < n; i++) {
        const x1 = darts[i][0],
            y1 = darts[i][1];
        for (let j = i + 1; j < n; j++) {
            const x2 = darts[j][0],
                y2 = darts[j][1];
            const dx = x2 - x1,
                dy = y2 - y1;
            const d2 = dx * dx + dy * dy;
            if (d2 === 0 || d2 > 4 * r2) {
                continue;
            }
            let h2 = r2 - d2 / 4.0;
            if (h2 < 0) {
                h2 = 0;
            }
            const scale = Math.sqrt(h2 / d2);
            const mx = (x1 + x2) / 2.0,
                my = (y1 + y2) / 2.0;
            for (const factor of [1.0, -1.0]) {
                best = Math.max(best, countAt(mx + factor * scale * -dy, my + factor * scale * dx));
            }
        }
    }
    return best;
}
