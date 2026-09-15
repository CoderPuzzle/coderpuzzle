function mctFromLeafValues(arr: number[]): number {
    const n = arr.length;
    // dp[i][j] = min sum of non-leaf nodes for subarray arr[i..j]
    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    // maxi[i][j] = max leaf value in arr[i..j]
    const maxi: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        maxi[i][i] = arr[i];
    }
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            maxi[i][j] = Math.max(maxi[i][j - 1], arr[j]);
        }
    }
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            let best: number | null = null;
            for (let k = i; k < j; k++) {
                const cost = maxi[i][k] * maxi[k + 1][j] + dp[i][k] + dp[k + 1][j];
                if (best === null || cost < best) {
                    best = cost;
                }
            }
            dp[i][j] = best;
        }
    }
    return dp[0][n - 1];
}
