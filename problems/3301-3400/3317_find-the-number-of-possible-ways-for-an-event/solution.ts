function numberOfWays(n: number, x: number, y: number): number {
    // dp[j] counts the assignments of the first i performers onto
    // exactly j nonempty of the x stages. The next performer either
    // joins one of the j formed bands or opens one on one of the
    // x - j + 1 unused stages; walking j downward updates the row in
    // place. Each j-band arrangement later takes a score per band, so
    // the answer sums dp[j] * y^j. All arithmetic is modulo 1e9 + 7,
    // applied bottom-up over performers and bands — no recursion.
    const MOD = 1000000007;
    // Residues stay below 2^30, but a raw product reaches 2^60, past
    // Number's exact-integer range — mulmod splits one side into two
    // 15-bit halves so every product stays below 2^46.
    const mulmod = (a: number, b: number): number => {
        const hi = Math.floor(a / 32768);
        const lo = a - hi * 32768;
        return (((hi * b) % MOD) * 32768 + ((lo * b) % MOD)) % MOD;
    };
    const dp = new Int32Array(x + 1);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
        const top = Math.min(i, x);
        for (let j = top; j >= 1; j--) {
            dp[j] = (mulmod(dp[j], j) + mulmod(dp[j - 1], x - j + 1)) % MOD;
        }
        dp[0] = 0;
    }
    let ans = 0;
    let power = 1;
    for (let j = 1; j <= x; j++) {
        power = mulmod(power, y);
        ans = (ans + mulmod(dp[j], power)) % MOD;
    }
    return ans;
}
