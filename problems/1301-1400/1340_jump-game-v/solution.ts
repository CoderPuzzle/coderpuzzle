function maxJumps(arr: number[], d: number): number {
    // Process indices in increasing height order: every one-jump target is
    // strictly lower, so its dp value is already final when needed.
    const n = arr.length;
    const order = arr.map((_, i) => i).sort((a, b) => arr[a] - arr[b]);
    const dp = new Array<number>(n).fill(1);
    for (const i of order) {
        for (let j = i + 1; j < n && j - i <= d && arr[j] < arr[i]; ++j) {
            dp[i] = Math.max(dp[i], 1 + dp[j]);
        }
        for (let j = i - 1; j >= 0 && i - j <= d && arr[j] < arr[i]; --j) {
            dp[i] = Math.max(dp[i], 1 + dp[j]);
        }
    }
    return Math.max(...dp);
}
