function maxScore(grid: number[][]): number {
    const n = grid.length;
    // value -> bitmask of rows containing that value
    const valueRows = new Map<number, number>();
    for (let r = 0; r < n; r++) {
        for (const c of grid[r]) {
            valueRows.set(c, (valueRows.get(c) || 0) | (1 << r));
        }
    }
    const values = Array.from(valueRows.keys()).sort((a, b) => b - a);
    const full = 1 << n;
    const dp = new Array<number>(full).fill(-1);
    dp[0] = 0;
    const ndp = new Array<number>(full).fill(-1);
    for (const value of values) {
        const rows = valueRows.get(value)!;
        for (let i = 0; i < full; i++) ndp[i] = dp[i];
        for (let mask = 0; mask < full; mask++) {
            const cur = dp[mask];
            if (cur < 0) continue;
            let rem = rows & ~mask;
            while (rem) {
                const bit = rem & -rem;
                const nmask = mask | bit;
                const cand = cur + value;
                if (cand > ndp[nmask]) ndp[nmask] = cand;
                rem &= rem - 1;
            }
        }
        for (let i = 0; i < full; i++) dp[i] = ndp[i];
    }
    let ans = 0;
    for (const v of dp) if (v > ans) ans = v;
    return ans;
}
