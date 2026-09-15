function maxSizeSlices(slices: number[]): number {
    const k = Math.floor(slices.length / 3);

    // dp[i][j] = best value using the first i entries, picking exactly j,
    // with no two chosen adjacent.
    const rob = function (arr: number[], picks: number): number {
        const length = arr.length;
        const dp: number[][] = Array.from({ length: length + 1 }, () => new Array(picks + 1).fill(-1));
        dp[0][0] = 0;
        for (let i = 1; i <= length; i++) {
            for (let j = 0; j <= picks; j++) {
                dp[i][j] = dp[i - 1][j];
                if (j >= 1) {
                    let base: number;
                    if (i >= 2) {
                        base = dp[i - 2][j - 1];
                    } else {
                        base = j === 1 ? 0 : -1;
                    }
                    if (base >= 0 && base + arr[i - 1] > dp[i][j]) {
                        dp[i][j] = base + arr[i - 1];
                    }
                }
            }
        }
        return dp[length][picks];
    };

    if (slices.length === 1) return slices[0];
    return Math.max(rob(slices.slice(0, -1), k), rob(slices.slice(1), k));
}
