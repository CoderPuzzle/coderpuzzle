function countTexts(pressedKeys: string): number {
    const MOD = 1_000_000_007;
    const n = pressedKeys.length;
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    let i = 0;
    while (i < n) {
        const ch = pressedKeys[i];
        const maxPress = ch === "7" || ch === "9" ? 4 : 3;
        let j = i;
        while (j < n && pressedKeys[j] === ch) {
            j++;
        }
        for (let p = i; p < j; p++) {
            let total = 0;
            for (let q = p; q >= i && p - q < maxPress; q--) {
                total = (total + dp[q]) % MOD;
            }
            dp[p + 1] = total;
        }
        i = j;
    }
    return dp[n];
}
