function minFallingPathSum(grid: number[][]): number {
    const n = grid.length;
    let prev = grid[0].slice();
    for (let i = 1; i < n; i++) {
        let min1 = Infinity,
            min2 = Infinity,
            idx1 = -1;
        for (let j = 0; j < n; j++) {
            const v = prev[j];
            if (v < min1) {
                min2 = min1;
                min1 = v;
                idx1 = j;
            } else if (v < min2) {
                min2 = v;
            }
        }
        const cur = new Array<number>(n);
        for (let j = 0; j < n; j++) {
            cur[j] = grid[i][j] + (j === idx1 ? min2 : min1);
        }
        prev = cur;
    }
    return Math.min(...prev);
}
