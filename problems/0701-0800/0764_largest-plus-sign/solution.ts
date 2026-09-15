// dp[i][j] ends as the order of the largest plus centered at (i, j): every
// cell starts uncapped at n, mines drop to 0, then four directional sweeps
// cap it by the run of consecutive 1's that way.
function orderOfLargestPlusSign(n: number, mines: number[][]): number {
    const dp: number[][] = Array.from({ length: n }, () => new Array<number>(n).fill(n));
    for (const [x, y] of mines) {
        dp[x][y] = 0;
    }
    for (let i = 0; i < n; ++i) {
        let run = 0;
        for (let j = 0; j < n; ++j) {
            run = dp[i][j] > 0 ? run + 1 : 0;
            if (run < dp[i][j]) {
                dp[i][j] = run;
            }
        }
        run = 0;
        for (let j = n - 1; j >= 0; --j) {
            run = dp[i][j] > 0 ? run + 1 : 0;
            if (run < dp[i][j]) {
                dp[i][j] = run;
            }
        }
    }
    for (let j = 0; j < n; ++j) {
        let run = 0;
        for (let i = 0; i < n; ++i) {
            run = dp[i][j] > 0 ? run + 1 : 0;
            if (run < dp[i][j]) {
                dp[i][j] = run;
            }
        }
        run = 0;
        for (let i = n - 1; i >= 0; --i) {
            run = dp[i][j] > 0 ? run + 1 : 0;
            if (run < dp[i][j]) {
                dp[i][j] = run;
            }
        }
    }
    let best = 0;
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            best = Math.max(best, dp[i][j]);
        }
    }
    return best;
}
