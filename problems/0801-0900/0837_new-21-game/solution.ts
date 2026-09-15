function new21Game(n: number, k: number, maxPts: number): number {
    if (k === 0 || n >= k - 1 + maxPts) {
        return 1.0;
    }
    // dp[i] = probability of ever holding exactly i points.
    const dp: number[] = new Array(n + 1).fill(0.0);
    dp[0] = 1.0;
    let window = 1.0; // sum of dp[max(0, i - maxPts) .. i - 1]
    for (let i = 1; i <= n; i++) {
        dp[i] = window / maxPts;
        if (i < k) {
            window += dp[i];
        }
        if (i - maxPts >= 0) {
            window -= dp[i - maxPts];
        }
    }
    // Compensated (Neumaier) summation, matching the reference's built-in sum().
    let result = 0.0;
    let c = 0.0;
    for (let i = k; i <= n; i++) {
        const x = dp[i];
        const t = result + x;
        if (Math.abs(result) >= Math.abs(x)) {
            c += result - t + x;
        } else {
            c += x - t + result;
        }
        result = t;
    }
    return result + c;
}
