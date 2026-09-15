function imageSmoother(img: number[][]): number[][] {
    // Each output cell averages the 3x3 window around it, clamped to the
    // matrix, so border cells average fewer than nine values; writing
    // into a fresh matrix keeps every window reading unsmoothed input.
    const m = img.length;
    const n = img[0].length;
    const smoothed: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    // The window rows run from Math.max(i-1, 0) to Math.min(i+2, m) and the
    // columns likewise; summing in integers and floor-dividing by the count
    // is the rounding-down average (values are non-negative).
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            let total = 0;
            let count = 0;
            for (let r = Math.max(i - 1, 0); r < Math.min(i + 2, m); ++r) {
                for (let c = Math.max(j - 1, 0); c < Math.min(j + 2, n); ++c) {
                    total += img[r][c];
                    ++count;
                }
            }
            smoothed[i][j] = Math.floor(total / count);
        }
    }
    return smoothed;
}
