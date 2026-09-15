function maxProductPath(grid: number[][]): number {
    const MOD = 1000000007n;
    const m = grid.length;
    const n = grid[0].length;
    let maxRow: bigint[] = new Array(n).fill(0n);
    let minRow: bigint[] = new Array(n).fill(0n);
    maxRow[0] = minRow[0] = BigInt(grid[0][0]);
    for (let j = 1; j < n; j++) {
        const value = maxRow[j - 1] * BigInt(grid[0][j]);
        maxRow[j] = minRow[j] = value;
    }

    for (let i = 1; i < m; i++) {
        const newMax: bigint[] = new Array(n).fill(0n);
        const newMin: bigint[] = new Array(n).fill(0n);
        const value = maxRow[0] * BigInt(grid[i][0]);
        newMax[0] = newMin[0] = value;
        for (let j = 1; j < n; j++) {
            const cur = BigInt(grid[i][j]);
            const a = maxRow[j] * cur;
            const b = minRow[j] * cur;
            const c = newMax[j - 1] * cur;
            const d = newMin[j - 1] * cur;
            newMax[j] = [a, b, c, d].reduce((x, y) => (y > x ? y : x));
            newMin[j] = [a, b, c, d].reduce((x, y) => (y < x ? y : x));
        }
        maxRow = newMax;
        minRow = newMin;
    }

    const best = maxRow[n - 1];
    if (best < 0n) {
        return -1;
    }
    return Number(best % MOD);
}
