function distinctSequences(n: number): number {
    const MOD = 1000000007;
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    if (n === 1) return 6;
    // dp[a][b] counts valid sequences ending in ..., a, b; the gap rule
    // looks back exactly two positions, so nothing older matters
    let dp: number[][] = Array.from({ length: 7 }, () => new Array(7).fill(0));
    // base: length-2 sequences, one per ordered coprime pair with a != b
    for (let a = 1; a <= 6; a++) {
        for (let b = 1; b <= 6; b++) {
            if (a !== b && gcd(a, b) === 1) dp[a][b] = 1;
        }
    }
    for (let len = 3; len <= n; len++) {
        const ndp: number[][] = Array.from({ length: 7 }, () => new Array(7).fill(0));
        for (let a = 1; a <= 6; a++) {
            for (let b = 1; b <= 6; b++) {
                const cnt = dp[a][b];
                // coprime pairs are sparse: skipping dead states prunes
                // most of the 36-entry table
                if (cnt === 0) continue;
                for (let c = 1; c <= 6; c++) {
                    // c !== b: no adjacent equal (coprimality alone misses
                    // (1,1)); c !== a: no repeat at distance 2 (gcd would
                    // not object when a = 1)
                    if (c !== a && c !== b && gcd(c, b) === 1) {
                        // ..., a, b, c ends in (b, c)
                        ndp[b][c] = (ndp[b][c] + cnt) % MOD;
                    }
                }
            }
        }
        dp = ndp;
    }
    // every entry is the ending of one full length-n sequence
    let total = 0;
    for (let a = 1; a <= 6; a++) {
        for (let b = 1; b <= 6; b++) total = (total + dp[a][b]) % MOD;
    }
    return total;
}
