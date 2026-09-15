function removeOnes(grid: number[][]): number {
    // Recursion over "which 1-cell do we clear next" with a memo map keyed
    // on the bitmask of remaining ones. At most 15 cells bounds both the
    // state count and the branching factor per state.
    const m = grid.length;
    const n = grid[0].length;
    const memo = new Map<number, number>();

    const solve = (state: number): number => {
        if (state === 0) {
            return 0;
        }
        const cached = memo.get(state);
        if (cached !== undefined) {
            return cached;
        }
        let best = m * n + 1;
        for (let cell = 0; cell < m * n; ++cell) {
            if (((state >> cell) & 1) === 0) {
                continue;
            }
            let cleared = state;
            for (let j = 0; j < n; ++j) {
                cleared &= ~(1 << (((cell / n) | 0) * n + j));
            }
            for (let i = 0; i < m; ++i) {
                cleared &= ~(1 << (i * n + (cell % n)));
            }
            best = Math.min(best, 1 + solve(cleared));
        }
        memo.set(state, best);
        return best;
    };

    let state = 0;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] === 1) {
                state |= 1 << (i * n + j);
            }
        }
    }
    return solve(state);
}
