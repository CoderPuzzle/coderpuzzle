function dieSimulator(n: number, rollMax: number[]): number {
    const MOD = 1000000007;
    // dp[j][c]: sequences of the current length ending with face j repeated
    // exactly c times (rollMax[i] <= 15, so 16 columns suffice)
    let dp: number[][] = Array.from({ length: 6 }, () => new Array(16).fill(0));
    // base: one single-roll sequence per face
    for (let j = 0; j < 6; j++) dp[j][1] = 1;
    for (let step = 2; step <= n; step++) {
        const nxt: number[][] = Array.from({ length: 6 }, () => new Array(16).fill(0));
        // per-face totals and grand total, from the previous table
        const totals = dp.map((row) => row.reduce((a, b) => a + b, 0));
        const grand = totals.reduce((a, b) => a + b, 0);
        for (let j = 0; j < 6; j++) {
            const limit = rollMax[j];
            // extending a run shifts counts up one column; never writing
            // past rollMax[j] is what keeps overlong runs impossible
            for (let c = 2; c <= limit; c++) {
                nxt[j][c] = dp[j][c - 1];
            }
            // fresh run of face j: any sequence ending in a different face
            nxt[j][1] = (((grand - totals[j]) % MOD) + MOD) % MOD;
        }
        dp = nxt;
    }
    // each legal sequence lands in exactly one cell (final face, run len)
    let answer = 0;
    for (const row of dp) {
        for (const value of row) answer = (answer + value) % MOD;
    }
    return answer;
}
