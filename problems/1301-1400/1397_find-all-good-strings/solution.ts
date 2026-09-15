function findGoodStrings(n: number, s1: string, s2: string, evil: string): number {
    const MOD = 1000000007;
    const m = evil.length;
    const fail: number[] = new Array(m).fill(0);
    let k = 0;
    for (let i = 1; i < m; i++) {
        while (k > 0 && evil.charCodeAt(i) !== evil.charCodeAt(k)) {
            k = fail[k - 1];
        }
        if (evil.charCodeAt(i) === evil.charCodeAt(k)) {
            k += 1;
        }
        fail[i] = k;
    }

    function advance(state: number, code: number): number {
        while (state > 0 && evil.charCodeAt(state) !== code) {
            state = fail[state - 1];
        }
        if (evil.charCodeAt(state) === code) {
            state += 1;
        }
        return state;
    }

    const dp = new Float64Array((n + 1) * (m + 1) * 4);

    for (let st = 0; st <= m; st++) {
        for (let lo = 0; lo <= 1; lo++) {
            for (let hi = 0; hi <= 1; hi++) {
                dp[(n * (m + 1) + st) * 4 + lo * 2 + hi] = st === m ? 0 : 1;
            }
        }
    }
    const s1c: number[] = [];
    const s2c: number[] = [];
    for (let q = 0; q < n; q++) {
        s1c.push(s1.charCodeAt(q));
        s2c.push(s2.charCodeAt(q));
    }
    for (let pos = n - 1; pos >= 0; pos--) {
        for (let state = 0; state <= m; state++) {
            if (state === m) {
                for (let lo = 0; lo <= 1; lo++) {
                    for (let hi = 0; hi <= 1; hi++) {
                        dp[(pos * (m + 1) + state) * 4 + lo * 2 + hi] = 0;
                    }
                }
                continue;
            }
            for (let lo = 0; lo <= 1; lo++) {
                for (let hi = 0; hi <= 1; hi++) {
                    const lowC = lo ? s1c[pos] : 97;
                    const highC = hi ? s2c[pos] : 122;
                    let total = 0;
                    for (let code = lowC; code <= highC; code++) {
                        const ns = advance(state, code);
                        if (ns === m) continue;
                        const nlo = lo && code === s1c[pos] ? 1 : 0;
                        const nhi = hi && code === s2c[pos] ? 1 : 0;
                        total += dp[((pos + 1) * (m + 1) + ns) * 4 + nlo * 2 + nhi];
                    }
                    dp[(pos * (m + 1) + state) * 4 + lo * 2 + hi] = total % MOD;
                }
            }
        }
    }
    return dp[1 * 2 + 1] % MOD;
}
