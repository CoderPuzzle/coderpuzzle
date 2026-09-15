function minAbsDiff(grid: number[][], k: number): number[][] {
    // Sorting a window's k*k values places the closest pair of distinct
    // values next to each other, so the smallest adjacent gap in the
    // sorted order is the minimum |a - b|; duplicate values contribute
    // a zero gap, and a k == 1 window has no pair, hence the 0 default.
    const m = grid.length;
    const n = grid[0].length;
    const answer = Array.from({ length: m - k + 1 }, () => new Array(n - k + 1).fill(0));
    for (let i = 0; i + k <= m; ++i) {
        for (let j = 0; j + k <= n; ++j) {
            const window: number[] = [];
            for (let r = i; r < i + k; ++r) {
                for (let c = j; c < j + k; ++c) {
                    window.push(grid[r][c]);
                }
            }
            window.sort((a, b) => a - b);
            let best = k === 1 ? 0 : window[1] - window[0];
            for (let t = 2; t < k * k; ++t) {
                best = Math.min(best, window[t] - window[t - 1]);
            }
            answer[i][j] = best;
        }
    }
    return answer;
}
