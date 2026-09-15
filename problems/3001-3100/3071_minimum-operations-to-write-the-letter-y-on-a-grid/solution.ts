function minimumOperationsToWriteY(grid: number[][]): number {
    const n = grid.length;
    const mid = n >> 1;
    const yCount = [0, 0, 0];
    const otherCount = [0, 0, 0];
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            const onY = (r === c && r <= mid) || (c === n - 1 - r && r <= mid) || (c === mid && r >= mid);
            if (onY) {
                yCount[grid[r][c]]++;
            } else {
                otherCount[grid[r][c]]++;
            }
        }
    }
    let best = n * n;
    for (let yValue = 0; yValue < 3; yValue++) {
        for (let otherValue = 0; otherValue < 3; otherValue++) {
            if (yValue === otherValue) {
                continue;
            }
            let cost = 0;
            for (let value = 0; value < 3; value++) {
                if (value !== yValue) {
                    cost += yCount[value];
                }
                if (value !== otherValue) {
                    cost += otherCount[value];
                }
            }
            best = Math.min(best, cost);
        }
    }
    return best;
}
