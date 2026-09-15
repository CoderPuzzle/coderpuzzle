function distinctSubseqII(s: string): number {
    const MOD = 1000000007;
    const n = s.length;
    const dp: number[] = new Array(n + 1).fill(0);
    // dp[i]: distinct subsequences of the first i chars, empty included.
    dp[0] = 1;
    const last: number[] = new Array(26).fill(-1);
    for (let i = 1; i <= n; i++) {
        const c = s.charCodeAt(i - 1) - 97;
        // Appending c nominally doubles the count...
        dp[i] = (dp[i - 1] * 2) % MOD;
        if (last[c] >= 0) {
            // ...but on a repeat, subtract the strings already produced
            // when c was last appended: dp of the prefix before it.
            dp[i] = (dp[i] - dp[last[c]] + MOD) % MOD;
        }
        last[c] = i - 1;
    }
    // Drop the empty subsequence (+MOD repairs the wrapped subtraction).
    return (dp[n] - 1 + MOD) % MOD;
}
