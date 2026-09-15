function largestMagicSquare(grid: number[][]): number {
    // Four prefix tables; per-window line sums are O(1). Sums reach
    // ~2.5e9 < 2^53, exact as JS numbers.
    const m = grid.length;
    const n = grid[0].length;
    const rs: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
    const cs: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
    const d1: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 2).fill(0));
    const a2: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 2).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const v = grid[i - 1][j - 1];
            rs[i][j] = rs[i][j - 1] + v;
            cs[i][j] = cs[i - 1][j] + v;
            d1[i][j] = v + d1[i - 1][j - 1];
        }
    }
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            a2[i][j] = grid[i - 1][j - 1] + a2[i - 1][j + 1];
        }
    }
    const rsum = (i: number, j: number, k: number) => rs[i + 1][j + k] - rs[i + 1][j];
    const csum = (i: number, j: number, k: number) => cs[i + k][j + 1] - cs[i][j + 1];
    for (let k = Math.min(m, n); k >= 1; k--) {
        for (let i = 0; i + k <= m; i++) {
            for (let j = 0; j + k <= n; j++) {
                const s = rsum(i, j, k);
                let ok = true;
                for (let t = 1; t < k && ok; t++) {
                    ok = rsum(i + t, j, k) === s;
                }
                for (let t = 0; t < k && ok; t++) {
                    ok = csum(i, j + t, k) === s;
                }
                if (ok && d1[i + k][j + k] - d1[i][j] !== s) ok = false;
                if (ok && a2[i + k][j + 1] - a2[i][j + 1 + k] !== s) ok = false;
                if (ok) {
                    return k;
                }
            }
        }
    }
    return 1;
}
