function countKReducibleNumbers(s: string, k: number): number {
    const MOD = 1000000007;
    const L = s.length;
    // f[x] = number of operations to reduce x to 1.
    const f = new Array<number>(L + 1).fill(0);
    for (let x = 2; x <= L; x++) {
        let bits = 0,
            t = x;
        while (t) {
            bits += t & 1;
            t >>>= 1;
        }
        f[x] = 1 + f[bits];
    }
    // Pascal's triangle mod MOD.
    const C: number[][] = [];
    for (let i = 0; i <= L; i++) {
        const row = new Array<number>(L + 1).fill(0);
        row[0] = 1;
        for (let j = 1; j <= i; j++) {
            row[j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
        }
        C.push(row);
    }
    // cnt[p] = number of integers x in [0, n-1] with popcount(x) == p.
    const cnt = new Array<number>(L + 1).fill(0);
    let ones = 0;
    for (let i = 0; i < L; i++) {
        if (s[i] === "1") {
            const remaining = L - i - 1;
            for (let p = 0; p <= remaining; p++) {
                cnt[ones + p] = (cnt[ones + p] + C[remaining][p]) % MOD;
            }
            ones++;
        }
    }
    let ans = 0;
    for (let p = 1; p <= L; p++) {
        if (1 + f[p] <= k) {
            ans = (ans + cnt[p]) % MOD;
        }
    }
    return ans;
}
