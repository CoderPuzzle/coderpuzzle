function maximumRows(matrix: number[][], numSelect: number): number {
    // Encode rows as bitmasks; a set of selected columns covers a row
    // exactly when the row's mask is a subset of it. Enumerate every
    // mask with popcount == numSelect and keep the best count.
    const m = matrix.length;
    const n = matrix[0].length;
    const masks: number[] = [];
    for (let i = 0; i < m; ++i) {
        let mask = 0;
        for (let j = 0; j < n; ++j) {
            if (matrix[i][j] === 1) {
                mask |= 1 << j;
            }
        }
        masks.push(mask);
    }
    let best = 0;
    for (let sel = 0; sel < 1 << n; ++sel) {
        let bits = 0;
        for (let t = sel; t !== 0; t >>= 1) {
            bits += t & 1;
        }
        if (bits !== numSelect) {
            continue;
        }
        let covered = 0;
        for (const row of masks) {
            if ((row & ~sel) === 0) {
                ++covered;
            }
        }
        best = Math.max(best, covered);
    }
    return best;
}
